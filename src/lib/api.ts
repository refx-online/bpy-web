import { apiUrl } from './env';
import type {
	Clan,
	getScoreInfo,
	MapInfo,
	MapScores,
	PlayerCounts,
	PlayerMostPlayed,
	PlayerScores,
	PlayerStatus,
	User
} from './types';

export const getClan = async (clanId: number): Promise<Clan | undefined> => {
	try {
		const requestedClanData = await fetch(`${apiUrl}/v1/get_clan?id=${clanId}`);
		if (!requestedClanData.ok) return undefined;
		return (await requestedClanData.json()) as Clan;
	} catch {
		return undefined;
	}
};

export const getBeatmap = async (beatmapId: number): Promise<MapInfo | undefined> => {
	try {
		const requestedMapData = await fetch(`${apiUrl}/v1/get_map_info?id=${beatmapId}`);
		if (!requestedMapData.ok) return undefined;
		return (await requestedMapData.json()) as MapInfo;
	} catch {
		return undefined;
	}
};

export const getBeatmapScores = async (opts: {
	beatmapMd5: string;
	mode: number;
	scope: 'best' | 'recent';
}): Promise<MapScores | undefined> => {
	try {
		const requestedMapData = await fetch(
			`${apiUrl}/v1/get_map_scores?md5=${opts.beatmapMd5}&mode=${opts.mode}&limit=50&scope=${opts.scope}`
		);
		if (!requestedMapData.ok) return undefined;
		return (await requestedMapData.json()) as MapScores;
	} catch {
		return undefined;
	}
};

export const getPlayerScores = async (opts: {
	userId: number;
	mode: number;
	limit: number;
	offset: number;
	includeLoved?: boolean;
	includeFailed?: boolean;
	scope: 'best' | 'recent' | 'first' | 'pinned';
}): Promise<PlayerScores | undefined> => {
	try {
		const requestedMapData = await fetch(
			`${apiUrl}/v1/get_player_scores?id=${opts.userId}&mode=${opts.mode}&limit=${opts.limit}&offset=${opts.offset}&include_failed=${
				opts.includeFailed ?? true
			}&include_loved=${opts.includeLoved ?? false}&scope=${opts.scope}`
		);
		if (!requestedMapData.ok) return undefined;
		return (await requestedMapData.json()) as PlayerScores;
	} catch {
		return undefined;
	}
};

export const getPlayerMostPlayed = async (opts: {
	userId: number;
	mode: number;
	limit: number;
}): Promise<PlayerMostPlayed | undefined> => {
	try {
		const requestedMapData = await fetch(
			`${apiUrl}/v1/get_player_most_played?id=${opts.userId}&mode=${opts.mode}&limit=${opts.limit}`
		);
		if (!requestedMapData.ok) return undefined;
		return (await requestedMapData.json()) as PlayerMostPlayed;
	} catch {
		return undefined;
	}
};

export const getPlayerCounts = async (): Promise<PlayerCounts | undefined> => {
	try {
		const requestedPlayerData = await fetch(`${apiUrl}/v1/get_player_count`);
		if (!requestedPlayerData.ok) return undefined;
		return (await requestedPlayerData.json()) as PlayerCounts;
	} catch {
		return undefined;
	}
};

export const getPlayerStatus = async (uid: number): Promise<PlayerStatus | undefined> => {
	try {
		const requestedPlayerData = await fetch(`${apiUrl}/v1/get_player_status?id=${uid}`);
		if (!requestedPlayerData.ok) return undefined;
		return (await requestedPlayerData.json()) as PlayerStatus;
	} catch {
		return undefined;
	}
};

export const getPlayer = async (
	uid: number,
	scope: 'all' | 'info' | 'stats'
): Promise<User | undefined> => {
	try {
		const requestedPlayerData = await fetch(
			`${apiUrl}/v1/get_player_info?id=${uid}&scope=${scope}`
		);
		if (!requestedPlayerData.ok) return undefined;
		return (await requestedPlayerData.json()) as User;
	} catch {
		return undefined;
	}
};

export const pinScore = async (
	scoreid: number, 
	isPinned: boolean, 
	currentUserId: number, 
	userId: number
) => {
    try {
        const response = await fetch('/stuff/pin-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scoreid, isPinned, currentUserId, userId })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to pin/unpin score');
        }

        return await response.json();
    } catch (error) {
        console.error('Error pinning/unpinning score:', error);
        throw error;
    }
};

export async function sendDiscordWebhookLog(logType:string, message: string) {
    try {
        const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_LOG_URL;
        if (!webhookUrl) {
            console.error('Discord webhook URL is not set');
            return;
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: message,
                username: logType
            })
        });

        if (!response.ok) {
            console.error('Failed to send Discord webhook', await response.text());
        }
    } catch (error) {
        console.error('Error sending Discord webhook:', error);
    }
}

export const getScoresInfo = async (
	scoreId: number
): Promise<getScoreInfo | undefined> => {
	try {
		const requestedPlayerData = await fetch(`${apiUrl}/v1/get_score_info?id=${scoreId}`);
		if (!requestedPlayerData.ok) return undefined;
		return (await requestedPlayerData.json()) as getScoreInfo;
	} catch {
		return undefined;
	}
};