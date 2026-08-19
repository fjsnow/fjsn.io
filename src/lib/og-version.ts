import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = path.resolve(process.cwd(), 'src');
const hash = crypto.createHash('sha256');

function addDirectory(directory: string) {
    const entries = fs
        .readdirSync(directory, { withFileTypes: true })
        .sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
        const filePath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            addDirectory(filePath);
            continue;
        }

        if (entry.isFile()) {
            const relativePath = path
                .relative(sourceRoot, filePath)
                .replaceAll(path.sep, '/');
            hash.update(relativePath);
            hash.update(fs.readFileSync(filePath));
        }
    }
}

addDirectory(sourceRoot);

export const ogVersion = hash.digest('hex').slice(0, 12);
