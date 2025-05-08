---
title: 'Overengineering a progressive email obfuscation solution'
description: 'A progressive, custom email obfuscation solution maximising accessibility for JavaScript-less users and screen readers.'
published: '2025-04-02'
---

## The problem

Working on my new site with [Astro](https://astro.build) (the one you're on!), I wanted my email address to be visible on the home-page, however as Astro builds your site to pure, static HTML, this means your email address, if left in plaintext, is easily scrapable by bots.

Following my philosophy of keeping my site as lightweight as possible, and being entirely accessible without JavaScript, ideally the solution I chose would be as accessible as possible, clickable, copyable, and didn't cause any layout shift caused by Javascript loading.

There's common solutions to this problem, including leaving instructions (`remove x from the email!`), using alternative characters (`[at], [dot], etc`), injecting hidden data via CSS to confuse scrapers, or encoding your email in JavaScript and decoding it on the client side with the assumption that malicious bots don't have the compute (or care) to run Javascript. I've detailed some common solutions below:

<div style="overflow-x: scroll" class="table-wrap">

| Method                 | Accessible | Clickable | Copyable | No JS | Ease to scrape |
| ---------------------- | ---------- | --------- | -------- | ----- | -------------- |
| **Plaintext**          | ✅         | ✅        | ✅       | ✅    | 🟥 Easy        |
| **Instructions**       | ✅         | ❌        | ❌       | ✅    | 🟩 Hard        |
| **Alternate Symbols**  | ✅         | ❌        | ❌       | ✅    | 🟨 Medium      |
| **Image**              | ❌         | ❌        | ❌       | ✅    | 🟩 Hard        |
| **CSS Pseudo Element** | ❌         | ❌        | ❌       | ✅    | 🟨 Medium      |
| **CSS Hidden Content** | ✅         | ❌        | ✅       | ✅    | 🟨 Medium      |
| **Decoded by Browser** | ✅         | ✅        | ✅       | ❌    | 🟩 Hard        |

</div>

One common JavaScript decoding based solution is implemented already by my hosting provider, [Cloudflare](https://cloudflare.com). At request level they will obfuscate the email address for you, and attach a small Javascript bundle to de-obfuscate it within the viewers browser. This is a great solution, however it causes layout shift as the email is initially displayed as `[email protected]`, later being replaced with the actual email address. This introduces a small visual shift as the Javascript loads and also leaves your email address completely inaccessible to non Javascript users.

### My solution

I decided to build my own solution, a mix between 2 of the above - injecting random, hidden content into the email address to mask it's value while still being visible to real users. Additionally, the email address is encrypted during the build process, which then the users browser decrypts and attaches the `mailto` attribute when they load the page. This achieves 4/5 of my requirements, with only the clickable requirement being sacrificed for non JavaScript users. With Javascript enabled, the link will become clickable, with no layout shift at all.

#### The Hidden Content

Firstly, at build time I employed the CSS trick, injecting a few random spans into the email address with a class that applies `display: none;` between the real characters. This keeps the email address entirely visible to both sighted users and screen readers, but makes it difficult for bots to scrape. Ideally, I would've used random class names and then load these in a seperate CSS file - However, Astro doesn't seem to support dynamically writing CSS files, so I used [Tailwind CSS](https://tailwindcss.com)'s hidden class instead.

I wrote a small function in Typescript that takes an email, and returns a jumble of spans, giving every character that doesn't actually belong in the email is given the `display: none` CSS property (via a class). Remember this is done at build time, not client side.

```typescript
function junk(email: string): string {
    let html = '';
    for (let i = 0; i < email.length; i++) {
        html += `<span>${email[i]}</span>`;
        for (let j = 0; j < Math.random() * 3 + 1; j++)
            html += `<span class="hidden">${String.fromCharCode(Math.floor(Math.random() * 26) + 97)}</span>`;
    }

    return html;
}

<a set:html={junk(email)} />
```

So far this solution works JavaScriptless, visually no different, accessible to screen readers and is copy pastable. With a bit of a tweak to my CSS, notably not underlining on hover when there is no `href` set, I'm happy with the result for non Javascript users, ticking 4/5 of my requirements, only missing the clickable requirement.

![The email address is visibly normal, however using inspect element you can see injected, hidden span tags between the characters](@/assets/img/email-obfuscation/1.png)

Next, I wanted to strip the junk characters and add a `mailto` link for users with JavaScript enabled. Now for the fun part - you get to write your own "encryption" and "decryption" algorithm! They don't have to be secure, just _unique_ enough that no bot would bother to decrypt it. The effort to decrypt emails would only make sense if it could be applied to a large number of sites, such as attacking Cloudflare's solution, so if anyone would bother to try to automatically decrypt my email, they might as well just open the site themselves.

I wrote a small keyed Caesar cipher function, with the key being the first 9 digits of pi, really, it doesn't matter, so you can be creative! It'll simply shift the characters in the email by the corresponding digit in pi (and wraps around if it goes past the 9th digit).

```typescript
function encrypt(email: string): string {
    const pi = '314159265';
    let encrypted = '';
    for (let i = 0; i < email.length; i++)
        encrypted += String.fromCharCode(
            email.charCodeAt(i) + parseInt(pi[i % pi.length])
        );

    return encrypted;
}
```

Reversing it is as simple as running the algorithm in reverse, undoing what we did when encrypting.

```typescript
function decrypt(encryptedEmail: string): string {
    const pi = '314159265';
    let decrypted = '';
    for (let i = 0; i < encryptedEmail.length; i++)
        decrypted += String.fromCharCode(
            encryptedEmail.charCodeAt(i) - parseInt(pi[i % pi.length])
        );

    return decrypted;
}
```

Now we can use our encryption function during the build phase, attaching the encrypted value as a data attribute on the anchor tag.

```astro
<a data-encrypted-email={encrypt(email)} set:html={junk(email)} />
```

Then when the JavaScript loads, it'll decrypt the email, attach the `mailto` attribute, remove the data attribute, and also remove the junk characters for a cleaner DOM.

```typescript
const emails = document.querySelectorAll('[data-encrypted-email]');
emails.forEach((email) => {
    if (!(email instanceof HTMLAnchorElement)) return;
    const decrypted = decrypt(email.dataset.encryptedEmail as string);
    email.innerHTML = decrypted;
    email.href = `mailto:${decrypted}`;
    email.removeAttribute('data-encrypted-email');
});
```

Finally, I combined this all together into a singular Astro component, passing in an email as a prop.

```astro
---
interface Props {
    email: string;
}

const { email } = Astro.props;

function encrypt(email: String) {
    const pi = '314159265';
    let encrypted = '';
    for (let i = 0; i < email.length; i++)
        encrypted += String.fromCharCode(
            email.charCodeAt(i) + parseInt(pi[i % pi.length])
        );

    return encrypted;
}

function junk(email: string): string {
    let html = '';
    for (let i = 0; i < email.length; i++) {
        html += `<span>${email[i]}</span>`;
        for (let j = 0; j < Math.random() * 3 + 1; j++)
            html += `<span class="hidden">${String.fromCharCode(Math.floor(Math.random() * 26) + 97)}</span>`;
    }

    return html;
}
---

<a data-encrypted-email={encrypt(email)} set:html={junk(email)} />
<script>
    function decrypt(encryptedEmail: String) {
        const pi = '314159265';
        let decrypted = '';
        for (let i = 0; i < encryptedEmail.length; i++)
            decrypted += String.fromCharCode(
                encryptedEmail.charCodeAt(i) - parseInt(pi[i % pi.length])
            );

        return decrypted;
    }

    const emails = document.querySelectorAll('[data-encrypted-email]');
    emails.forEach((email) => {
        if (!(email instanceof HTMLAnchorElement)) return;
        const decrypted = decrypt(email.dataset.encryptedEmail as string);
        email.innerHTML = decrypted;
        email.href = `mailto:${decrypted}`;
        email.removeAttribute('data-encrypted-email');
    });
</script>
```

And we're done! Swapping out the original `a` tag in my index with my new custom `Email` class, we can use the new component like this:

```diff
- ..shoot me an email at <a href="mailto:spam@fjsn.io">spam@fjsn.io</a> or send me..
+ ..shoot me an email at <Email email="spam@fjsn.io"/> or send me..
```

Now, initially when we load our page our DOM looks like just the CSS above, but once the JavaScript loads, our DOM looks as if we'd had just written it in plaintext, and there is no visual change! That's 5/5 of the requirements for Javascript users! You can now click on the email to launch your email client.

Maybe a little overengineered, maybe there's easier methods, but all in all, I'm happy with the result.
