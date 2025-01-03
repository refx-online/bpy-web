import { getMySQLDatabase, getRedisClient } from '../hooks.server';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import type { DBUser } from './types';
import { usernameRegex } from './regex';
import { getInfoFromIP } from './geoloc';

export const createPassword = (plainPassword: string): Promise<string> => {
	const pw_md5 = crypto.createHash('md5').update(plainPassword).digest('hex');
	const bw_bcrypt = bcrypt.hash(pw_md5, 10);
	return bw_bcrypt;
};

export async function comparePasswords(plainPassword: string, hashed_pw: string): Promise<boolean> {
	return await bcrypt.compare(
		crypto.createHash('md5').update(plainPassword).digest('hex'),
		hashed_pw
	);
}

export const register = async (opts: {
	username: string;
	password: string;
	ip: string;
	/*discordId: string;
	authKey: string;*/
}): Promise<{ succeeded: boolean; message: string }> => {
	const { username, password, ip } = opts;

	if (!usernameRegex.test(username)) {
		return {
			succeeded: false,
			message: 'Invalid username, it also may contain dashes and spaces, but not both.'
		};
	}

	if (password.length < 6) {
		return {
			succeeded: false,
			message: 'Your password should have more than 6 characters!'
		};
	}

	const mysqlDatabase = await getMySQLDatabase();

	const userResult = await mysqlDatabase<DBUser>('users').where('name', username).limit(1).first();
	if (userResult)
		return {
			succeeded: false,
			message: 'a user with this name already exists'
		};

	const hashedPassword = await createPassword(password);
	const safeName = username.toLowerCase().replaceAll(' ', '_');
	let countryCode = '';
	try {
		countryCode = (await getInfoFromIP(ip)).countryCode.toLowerCase();
	} catch {
		countryCode = 'xx';
	}

	const modeIds = [0, 1, 2, 3, 4, 5, 6, 7];
	const currentTimestamp = (Date.now() / 1000).toFixed();

	await mysqlDatabase.transaction(async (trx) => {
		const userIdInsert = await trx('users').insert({
			name: username,
			safe_name: safeName,
			priv: (1 << 1), // i forgot where did kaupec removes the ingame login check on b.py
			pw_bcrypt: hashedPassword,
			country: countryCode,
			creation_time: currentTimestamp,
			latest_activity: currentTimestamp
		});
		const userId = userIdInsert[0];
		const statsArray: { id: number; mode: number }[] = [];

		modeIds.forEach((mode) => {
			statsArray.push({
				id: userId,
				mode: mode
			});
		});
		await trx('stats').insert(statsArray);
	});

	return {
		succeeded: true,
		message: ''
	};
};

export const login = async (opts: {
	username: string;
	password: string;
}): Promise<DBUser | undefined> => {
	const { username, password } = opts;
	const mysqlDatabase = await getMySQLDatabase();
	const userResult = await mysqlDatabase<DBUser>('users')
		.where(function () {
			this.where('name', username);
		})
		.limit(1)
		.first();
	if (!userResult) return undefined;
	const hashedPassword = userResult.pw_bcrypt;
	const isPasswordCorrect = await comparePasswords(password, hashedPassword);
	if (!isPasswordCorrect) return undefined;
	return userResult;
};

export const getUserFromSession = async (sessionToken: string): Promise<DBUser | undefined> => {
	const redisClient = await getRedisClient();
	const userId = await redisClient.get(`user:session:${sessionToken}`);
	if (!userId) return undefined;
	const mysqlDatabase = await getMySQLDatabase();
	const user = await mysqlDatabase<DBUser>('users').where('id', userId).first();
	return user;
};
