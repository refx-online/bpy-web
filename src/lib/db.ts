import { getMySQLDatabase } from '../hooks.server';
import type { DBClan } from './types';
import type { TopScore } from './types';

export const getClans = async (opts: {
	mode: number;
	limit: number;
	offset: number;
}): Promise<DBClan[] | undefined> => {
	try {
		//NOTE: PLEASE FIX THIS LATER THIS IS BS naw bru you fix it yourself :trole:
		const mysqlDB = await getMySQLDatabase();
		if (!mysqlDB) return [];
		if (opts.limit < 1 || opts.offset < 0) return [];
		if (opts.limit > 100) opts.limit = 100;

		const clans = await mysqlDB('clans')
			.select('clans.id', 'clans.name', 'clans.tag', 'clans.owner')
			.select(mysqlDB.raw('ROUND(SUM(stats.pp) / COUNT(users.id)) as total_pp'))
			.count('users.id as users')
			.join('users', 'clans.id', 'users.clan_id')
			.join('stats', 'users.id', 'stats.id')
			.where('stats.mode', opts.mode)
			.groupBy('clans.id', 'clans.name')
			.orderBy('total_pp', 'desc')
			.limit(opts.limit)
			.offset(opts.offset);
		return clans.map((c) => {
			c.total_pp = parseFloat(c.total_pp as string);
			return c;
		}) as DBClan[];
	} catch (e) {
		console.log(e);
		return undefined;
	}
};

export const getTopScores = async (opts: {
    mode: number;
    limit?: number;
    offset?: number;
}): Promise<TopScore[] | undefined> => {
    try {
        const mysqlDB = await getMySQLDatabase();
        if (!mysqlDB) return [];

        const limit = opts.limit ?? 45;
        const offset = opts.offset ?? 0;
		// me when raw
        const scores = await mysqlDB.raw(`
            SELECT s.status, s.id as scoreid, s.userid, s.pp, s.mods, s.grade, 
                   m.set_id, m.title, m.version, m.artist, 
                   u.country, u.name as username,
                   m.id as map_id
            FROM scores s 
            LEFT JOIN users u ON u.id = s.userid 
            LEFT JOIN maps m ON m.md5 = s.map_md5 
            WHERE s.mode = ? 
            AND u.priv & 1 
            AND m.status IN (2, 3) 
            AND s.status = 2 
            ORDER BY s.pp DESC 
            LIMIT ? OFFSET ?
        `, [opts.mode, limit, offset]);

        return scores[0] as TopScore[];
    } catch (e) {
        console.error('Error fetching top scores:', e);
        return undefined;
    }
};

export const getTopScoresCount = async (mode: number): Promise<number> => {
    try {
        const mysqlDB = await getMySQLDatabase();
        if (!mysqlDB) return 0;

        const countResult = await mysqlDB.raw(`
            SELECT COUNT(*) as count
            FROM scores s 
            LEFT JOIN users u ON u.id = s.userid 
            LEFT JOIN maps m ON m.md5 = s.map_md5 
            WHERE s.mode = ? 
            AND u.priv & 1 
            AND m.status IN (2, 3) 
            AND s.status = 2
        `, [mode]);

        return countResult[0][0].count;
    } catch (e) {
        console.error('Error fetching top scores count:', e);
        return 0;
    }
};