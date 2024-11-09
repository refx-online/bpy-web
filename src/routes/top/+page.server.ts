import { getTopScores, getTopScoresCount } from '$lib/db';
import { parseModsInt } from '$lib/mods';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
    const modeParam = url.searchParams.get('mode') ?? '0';
    const pageParam = url.searchParams.get('page') ?? '1';

    const mode = parseInt(modeParam);
    const page = parseInt(pageParam);

    if (isNaN(mode) || isNaN(page)) {
        error(400, 'Invalid mode or page');
    }

    const limit = 45;
    const offset = (page - 1) * limit;

    const [scores, totalScores] = await Promise.all([
        getTopScores({ mode, limit, offset }),
        getTopScoresCount(mode)
    ]);

    const totalPages = Math.ceil(totalScores / limit);

    return {
        scores: scores?.map(score => ({
            ...score,
            mods: parseModsInt(score.mods)
        })),
        mode,
        page,
        totalPages
    };
}