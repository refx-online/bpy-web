// got no other choice
// im actually braindead on this
// sowwy
// atleast it works
import { error } from '@sveltejs/kit';
import { getMySQLDatabase } from '../../../hooks.server';

export const POST = async ({ request }) => {
    const { scoreid, isPinned, currentUserId, userId } = await request.json();

    if (currentUserId !== userId) {
        error(403, 'Unauthorized');
    }

    try {
        const mysqlDB = await getMySQLDatabase();
        if (!mysqlDB) {
            error(500, 'Database connection failed');
        }

        await mysqlDB.raw(
            isPinned 
                ? "UPDATE scores SET pinned = 0 WHERE id = ?" 
                : "UPDATE scores SET pinned = 1 WHERE id = ?", 
            [scoreid]
        );

        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error('Pin score error:', err);
        error(500, 'Failed to update score');
    }
};