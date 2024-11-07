import { json, error } from '@sveltejs/kit';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { getUserFromSession } from '$lib/user';
import { env } from '$env/dynamic/private';

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
        const file = formData.get('avatar') as File;

        if (!file) {
            return error(400, 'No file uploaded');
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            return error(400, 'Invalid file type. Only JPEG and PNG are allowed.');
        }
        
        // 5 ato 2?
        const maxFileSize = 5 * 1024 * 1024;
        if (file.size > maxFileSize) {
            return error(400, 'file size exceeds the 5 MB limit');
        }

        const extensions = ['jpg', 'jpeg', 'png'];
        const avatarDirectory = env.AVATAR_DIRECTORY;

        for (const ext of extensions) {
            const existingFilePath = path.join(avatarDirectory, `${user.id}.${ext}`);
            try {
                await unlink(existingFilePath);
            } catch (err: unknown) {
                if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
                    console.error(`Failed to delete existing avatar: ${existingFilePath}`, err);
                }
            }
        }

        const fileExtension = file.type === 'image/jpeg' ? 'jpg' : 'png';
        const avatarPath = path.join(avatarDirectory, `${user.id}.${fileExtension}`);

        const buffer = new Uint8Array(await file.arrayBuffer());
        // console.log(avatarPath)
        await writeFile(avatarPath, buffer);

        return json({
            success: true,
            user: {
                id: user.id
            }
        });
    } catch (err) {
        console.error('Avatar upload error:', err);
        return error(500, 'Failed to upload avatar');
    }
};