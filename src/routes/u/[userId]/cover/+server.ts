import path from 'path';
import { existsSync } from 'fs';
import { error } from '@sveltejs/kit';
import { readFile } from 'fs/promises';

const coversFolder = path.join(process.cwd(), '.data', 'cover');

export async function GET({ params }) {
    const userId = params.userId;
    const coverPath = path.join(coversFolder, `${userId}.jpg`);

    if (!existsSync(coverPath)) {
        return error(404, 'Cover not found');
    }

    const cover = await readFile(coverPath);
    return new Response(cover, {
        status: 200,
        headers: {
            'Content-Type': 'image/jpeg'
        }
    });
}