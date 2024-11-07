import { redirect } from '@sveltejs/kit';
import { getUserFromSession } from '$lib/user';

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