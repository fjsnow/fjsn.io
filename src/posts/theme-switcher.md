---
title: Designing a progressive theme switcher
description: A theme switcher that allows users to choose between light and dark themes, with a fallback to system preferences that works without JavaScript.
published: 05-08-2025
---

I've designed my site to be Javascript-free first, then progressively enhanced with JavaScript. Although my personal site has supported both light and dark themes based upon your systems preference for a while, I wanted to add a theme switcher to allow users to swap easily between the two on just my site, which defaulted to the system preference.

As I use [Tailwind](https://tailwindcss.com/) for styling, I already was using the `dark:` prefix to conditionally apply dark mode styles. By default in Tailwind v4 this applies styles based upon a media query, which works perfectly for JavaScript and non JavaScript users alike. However, their [guide](https://tailwindcss.com/docs/dark-mode) for implementing a theme switcher with a system prefernece fallback is not progressively enhanced, and JavaScript-less users are left being always in light mode regardless of their system preference.

Their solution is to attach a special `dark` class to the `html` element then override the default custom-variant dark with a CSS selector.

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Then a custom script is ran to add the `dark` class to the `html` based upon the user's preference, falling back to the system preference if no preference is set.

```javascript
document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
);
```

This sadly breaks the functionality for Javascript-less users, and even if you do have Javascript, the site won't update if you change your system preference, as the script only runs on page load.

When searching for a solution, I wanted to build a hybrid solution between the class and the media query, however I quickly realised that not enough information is maintained for the CSS to know if the user has selected a theme or not, as if the `dark` class is omitted, this could either mean a Javascript-less user, or a user who has chosen light mode.

I opted to rather use a custom attribute on the HTML, giving the CSS enough context to know which theme to show. On the page load, I check whether the user has a preference set in local storage and set the attribute accordingly. I don't set the attribute if the user has no preference set yet.

```javascript
const theme = localStorage.getItem('theme');
if (theme) document.documentElement.setAttribute('data-theme', theme);
```

Now, in the CSS, I use the custom attribute to show dark mode in two situations: If the user has selected dark mode, or if the user has not set a preference and their system preference is dark.

```css
@custom-variant dark {
    &:where([data-theme='dark'] *) {
        @slot;
    }
    @media (prefers-color-scheme: dark) {
        &:where(:not([data-theme='light'] *)) {
            @slot;
        }
    }
}
```

Finally, I needed a way for the user to select the theme. Going with the progressive enhancement approach, I added a button only visible to Javascript users (Using a sneaky CSS class `js-only` that is declared within a `<noscript>` tag).

```html
<div class="js-only relative h-4 w-4 cursor-pointer gap-2" id="theme-toggle">
    <Light
        class="absolute top-0 left-0 z-10 block h-4 w-4 text-stone-500 hover:text-stone-700 dark:hidden"
        aria-label="Enable dark mode"
    />
    <Dark
        class="absolute top-0 left-0 z-10 hidden h-4 w-4 text-stone-400 hover:text-stone-300 dark:block"
        aria-label="Enable light mode"
    />
</div>
<script>
    const toggle = () => {
        const theme =
            localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light');

        let next = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', next);
        document.documentElement.setAttribute('data-theme', next);
    };

    const themeToggle = document.getElementById('theme-toggle')!;
    themeToggle.addEventListener('click', toggle);
</script>
```

The end product is a theme switcher with system preference fallback that works flawlessly for JavaScript users, with no negative impact on the experience for JavaScriptless users.
