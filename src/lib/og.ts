import fs from 'node:fs';
import path from 'node:path';

function readAsset(relativePath: string) {
    return fs.readFileSync(path.resolve(process.cwd(), relativePath));
}

function toArrayBuffer(bytes: Buffer): ArrayBuffer {
    return Uint8Array.from(bytes).buffer as ArrayBuffer;
}

export function getOgAssets() {
    const avatar = readAsset('src/assets/avatar.png');
    const regular = readAsset('src/assets/fonts/RobotoMono-Regular.ttf');
    const medium = readAsset('src/assets/fonts/RobotoMono-Medium.ttf');

    return {
        avatar: `data:image/png;base64,${avatar.toString('base64')}`,
        fonts: [
            {
                name: 'Roboto Mono Regular',
                data: toArrayBuffer(regular),
                weight: 400 as const,
                style: 'normal' as const,
            },
            {
                name: 'Roboto Mono Medium',
                data: toArrayBuffer(medium),
                weight: 500 as const,
                style: 'normal' as const,
            },
        ],
    };
}
