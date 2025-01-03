export type UserData = {
	id: number;
	username: string;
	priv: number;
};

export type UserLoginData = {
	username: string;
	password: string;
};

export type DBUser = {
	id: number;
	name: string;
	safe_name: string;
	email: string;
	priv: number;
	pw_bcrypt: string;
	country: string;
	silence_end: number;
	donor_end: number;
	creation_time: number;
	latest_activity: number;
	clan_id: number;
	clan_priv: number;
	userpage_content: string;
};

export type LBUser = {
	a_count: number;
	acc: number;
	clan_id: number;
	clan_name: string;
	clan_tag: string;
	country: string;
	max_combo: number;
	name: string;
	player_id: number;
	plays: number;
	playtime: number;
	pp: number;
	xp: number;
	rscore: number;
	s_count: number;
	sh_count: number;
	tscore: number;
	x_count: number;
	xh_count: number;
};

export type UserModeStats = {
	tscore: number;
	rscore: number;
	pp: number;
	xp: number;
	plays: number;
	playtime: number;
	acc: number;
	max_combo: number;
	xh_count: number;
	x_count: number;
	sh_count: number;
	s_count: number;
	a_count: number;
	replay_views: number;
	rank: number;
	country_rank: number;
};

export type User = {
	status: 'success' | string;
	player?: {
		info: {
			id: number;
			name: string;
			safe_name: string;
			creation_time: number;
			latest_activity: number;
			priv: number;
			clan_id: number;
			country: string;
			preferred_mode: number;
			userpage_content: string;
		};
		stats: {
			[mode: number]: UserModeStats;
		};
	};
};

export type DBClan = {
	id: number;
	name: string;
	tag: string;
	owner: number;
	total_pp: number;
	users: number;
};

export type Clan = {
	id: number;
	name: string;
	tag: string;
	members: {
		id: number;
		name: string;
		country: string;
		rank: string;
	}[];
	owner: {
		id: number;
		name: string;
		country: string;
		rank: string;
	};
};

export type MapInfo = {
	status: 'success' | string;
	map: {
		md5: string;
		id: number;
		set_id: number;
		artist: string;
		title: string;
		version: string;
		creator: string;
		last_update: string;
		total_length: number;
		max_combo: number;
		status: number;
		plays: number;
		passes: number;
		mode: number;
		bpm: number;
		cs: number;
		od: number;
		ar: number;
		hp: number;
		diff: number;
	};
};

export type MapScore = {
	map_md5: string;
	score: number;
	pp: number;
	acc: number;
	max_combo: number;
	mods: number;
	n300: number;
	n100: number;
	n50: number;
	nmiss: number;
	ngeki: number;
	nkatu: number;
	grade: string;
	status: number;
	mode: number;
	play_time: string;
	time_elapsed: number;
	userid: number;
	perfect: number;
	player_name: string;
  player_country: string;
	country?: string; // Deprecated
	clan_id: number;
	clan_name: string;
	clan_tag: string;
	id: number;
};

export type PlayerScore = {
	id: number;
	score: number;
	pp: number;
	acc: number;
	max_combo: number;
	mods: number;
	n300: number;
	n100: number;
	n50: number;
	nmiss: number;
	ngeki: number;
	nkatu: number;
	grade: string;
	status: number;
	mode: number;
	play_time: string;
	time_elapsed: number;
	perfect: number;
	pinned: number;
	beatmap: {
		md5: string;
		id: number;
		set_id: number;
		artist: string;
		title: string;
		version: string;
		creator: string;
		last_update: string;
		total_length: number;
		max_combo: number;
		status: number;
		plays: number;
		passes: number;
		mode: number;
		bpm: number;
		cs: number;
		od: number;
		ar: number;
		hp: number;
		diff: number;
	};
};

export type MapScores = {
	status: 'success' | string;
	scores: MapScore[];
};

export type PlayerScores = {
	status: 'success' | string;
	scores: PlayerScore[];
	player: {
		id: number;
		name: string;
		clan: {
			id: number;
			name: string;
			tag: string;
		};
	};
};

export type PlayerMostPlayed = {
	status: 'success' | string;
	maps: {
		md5: string;
		id: number;
		set_id: number;
		status: number;
		artist: string;
		title: string;
		version: string;
		creator: string;
		plays: number;
	}[];
};

export type Mod = {
	name: string;
	short_name: string;
};

export type PlayerCounts = {
	counts: {
		online: number;
		total: number;
	};
};

export type PlayerStatus = {
	status: 'success' | string;
	player_status: {
		online: boolean;
		last_seen?: number;
		login_time?: number;
		status?: {
			action: number;
			info_text: string;
			mode: number;
			mods: number;
			beatmap: {
				md5: string;
				id: number;
				set_id: number;
				artist: string;
				title: string;
				version: string;
				creator: string;
				last_update: string;
				total_length: number;
				max_combo: number;
				status: number;
				plays: number;
				passes: number;
				mode: number;
				bpm: number;
				cs: number;
				od: number;
				ar: number;
				hp: number;
				diff: number;
			};
		};
	};
};

export type TopScore = {
    scoreid: number;
    userid: number;
    pp: number;
    mods: number;
    grade: string;
    set_id: number;
    title: string;
    version: string;
	artist: string;
    country: string;
    username: string;
    map_id: number;
};

export type getScoreInfo = {
	status: 'success' | string;
	score: ScoreInfo[];
}

export type ScoreInfo = {
    id: number;
    map_md5: string;
    score: number;
    xp_gained: number;
    pp: number;
    acc: number;
    max_combo: number;
    mods: number;
    n300: number;
    n100: number;
    n50: number;
    nmiss: number;
    ngeki: number;
    nkatu: number;
    grade: string;
    status: number;
    mode: number;
    play_time: string;
    time_elapsed: number;
    client_flags: number;
    userid: number;
    perfect: number;
    online_checksum: string;
    aim_value: number;
    ar_value: number;
    aim: number;
    arc: number;
    cs: number;
    tw: number;
    twval: number;
    hdr: number;
    pinned: number;
};