import { json, error } from '@sveltejs/kit';
import { writeFile, unlink, mkdir } from 'fs/promises';
import path from 'path';
import { getUserFromSession } from '$lib/user';

export const POST = async ({ request, cookies }) => {
    try {
        const sessionToken = cookies.get('sessionToken');
        if (!sessionToken) {
            return error(401, 'Not authenticated');
        }

        const user = await getUserFromSession(sessionToken);
        if (!user) {
            return error(401, 'Invalid session');
        }

        const formData = await request.formData();
        const file = formData.get('cover') as File;

        if (!file) {
            return error(400, 'No file uploaded');
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            return error(400, 'Invalid file type. Only JPEG and PNG are allowed.');
        }

        const maxFileSize = 2 * 1024 * 1024;
        if (file.size > maxFileSize) {
            return error(400, 'File size exceeds the 2 MB limit');
        }

        const fileExtension = file.type === 'image/jpeg' ? 'jpg' : 'png';
        const coverDirectory = path.join(process.cwd(), '.data', 'cover');

        try {
            await mkdir(coverDirectory, { recursive: true });
        } catch (mkdirError) {
            console.error('Failed to create cover directory:', mkdirError);
            return error(500, 'Failed to create cover directory');
        }

        const existingCoverPath = path.join(coverDirectory, `${user.id}.${fileExtension}`);
        try {
            await unlink(existingCoverPath);
        } catch (err: unknown) {
            if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
                console.error(`Failed to delete existing cover: ${existingCoverPath}`, err);
            }
        }

        const coverPath = path.join(coverDirectory, `${user.id}.${fileExtension}`);
        const buffer = new Uint8Array(await file.arrayBuffer());
        await writeFile(coverPath, buffer);

        return json({
            success: true,
            user: {
                id: user.id
            }
        });
    } catch (err) {
        console.error('Cover upload error:', err);
        return error(500, 'Failed to upload cover');
    }
};