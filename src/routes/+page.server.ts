import { getPlayerCounts } from '$lib/api';
import { getMySQLDatabase } from '../hooks.server';
import type { DBUser } from '$lib/types';

export const load = async () => {
	const userCounts = await getPlayerCounts();
    const mysqlDatabase = await getMySQLDatabase();

    const recentAccounts = await mysqlDatabase<DBUser>('users')
        .select('id', 'name', 'creation_time')
        .orderBy('creation_time', 'desc')
        .limit(10);

    const rankedMapsCount = await mysqlDatabase('maps')
        .where('status', '=', 2)
        .count('* as count')
        .first()
        .then(result => result ? result.count : 0);

	// selects the highest pp scores per game mode for scores on ranked/approved maps,
	// order by mode.
	const ppRecords = await mysqlDatabase.raw(`
		SELECT s.mode, s.pp, s.score, u.name, u.id 
		FROM scores s
		JOIN (
			SELECT s2.mode, MAX(s2.pp) as max_pp 
			FROM scores s2
			JOIN maps m ON s2.map_md5 = m.md5
			WHERE s2.mode IN (0, 1, 2, 3, 4, 5, 6, 7)
			AND m.status IN (2, 3)
			AND s2.status = 2
			GROUP BY s2.mode
		) m ON s.mode = m.mode AND s.pp = m.max_pp
		JOIN users u ON s.userid = u.id
		JOIN maps map ON s.map_md5 = map.md5
		WHERE map.status IN (2, 3) 
		AND s.status = 2
		ORDER BY s.mode
    `);

    return {
        userCounts,
        recentAccounts,
        rankedMapsCount,
        ppRecords: ppRecords[0]
    };
};
