import { login } from '$lib/user';
import { error, json } from '@sveltejs/kit';
import { getRedisClient } from '../../hooks.server';
import { makeid } from '$lib/stringUtil';
import { env } from '$env/dynamic/private';
import { env as pubEnv } from '$env/dynamic/public';
import { validateTurnstileToken } from '$lib/captcha';
import { getClientIP } from '$lib/request';
import dayjs from 'dayjs';

const turnstileEnabled =
	pubEnv.PUBLIC_TURNSTILE_SITE_KEY && pubEnv.PUBLIC_TURNSTILE_SITE_KEY.length > 0;
const turnstileSecretKey = env.TURNSTILE_SECRET_KEY;

export const POST = async ({ cookies, request, getClientAddress }) => {
	if (request.headers.get('content-type') !== 'application/json') {
		return error(400, 'Invalid content type');
	}

	const clientIP = getClientIP(request, getClientAddress());
	const bodyData: { username: string; password: string; captchaToken: string } = JSON.parse(
		Buffer.from(await request.arrayBuffer()).toString('utf-8')
	);

	if (turnstileEnabled) {
		const captchaCheck = await validateTurnstileToken({
			secret: turnstileSecretKey!,
			token: bodyData.captchaToken,
			ip: clientIP
		});

		if (!captchaCheck.success) return error(400, 'Catcha validation failed');
	}

	const user = await login({
		username: bodyData.username,
		password: bodyData.password
	});
	if (!user) return error(400, 'Invalid login credentials');

	const redisClient = await getRedisClient();
	const sessionToken = makeid(128);
	const sessionExpiry = dayjs().add(30, 'day');

	const result = await redisClient.set(`user:session:${sessionToken}`, user.id, {
		EXAT: sessionExpiry.toDate().getTime()
	});

	if (result !== 'OK') return error(500, 'Failed to create session');

	cookies.set('sessionToken', sessionToken, {
		path: '/',
		priority: 'high',
		maxAge: sessionExpiry.toDate().getTime()
	});

	return json({
		message: 'Login successful',
		user: {
			id: user.id,
			username: user.name,
			priv: user.priv
		}
	});
};
