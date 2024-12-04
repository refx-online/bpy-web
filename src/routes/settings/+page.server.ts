import { redirect } from '@sveltejs/kit';
import { getUserFromSession } from '$lib/user';
import { fail } from '@sveltejs/kit';
import { getMySQLDatabase } from '../../hooks.server';
import { sendDiscordWebhookLog } from '$lib/api';

export const load = async ({ cookies }) => {
    const sessionToken = cookies.get('sessionToken');
    if (!sessionToken) {
        redirect(302, '/signin');
    }

    const user = await getUserFromSession(sessionToken);
    if (!user) {
        redirect(302, '/signin');
    }

    return {
        user: {
            id: user.id,
            username: user.name
        }
    };
};

export const actions = {
    changeUsername: async ({ request, cookies }) => {
        const sessionToken = cookies.get('sessionToken');
        if (!sessionToken) {
            return redirect(302, '/signin');
        }

        const user = await getUserFromSession(sessionToken);
        if (!user) {
            return redirect(302, '/signin');
        }

        const data = await request.formData();
        const newUsername = data.get('newUsername')?.toString().trim();

        if (!newUsername) {
            return fail(400, { message: 'Username cannot be empty' });
        }

        const usernameRegex = /^[a-zA-Z0-9_]+$/; // will check for different regex
        if (!usernameRegex.test(newUsername)) {
            return fail(400, { message: 'Invalid username format' });
        }

        // TODO: add supporter check, tbh it wouldnt be necessary for this server
        if (newUsername.length < 2 || newUsername.length > 20) {
            return fail(400, { message: 'Username must be between 3 and 20 characters' });
        }

        try {
            const mysqlDatabase = await getMySQLDatabase();

            const existingUser = await mysqlDatabase
                .select('id')
                .from('users')
                .where('name', newUsername)
                .first();

            if (existingUser) {
                return fail(400, { message: 'Username already taken' });
            }

            const safeName = newUsername.toLowerCase().replace(/[^a-z0-9]/g, '_');

            await mysqlDatabase('users')
                .where('id', user.id)
                .update({
                    name: newUsername,
                    safe_name: safeName
                });
            
            sendDiscordWebhookLog('change name', `${user.name} (${user.id}) -> ${newUsername} (${user.id})`)

            return { success: true };
        } catch (error) {
            console.error('Username change error:', error);
            return fail(500, { message: 'An error occurred while updating username' });
        }
    }
};