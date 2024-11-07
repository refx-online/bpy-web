import { env } from '$env/dynamic/public';

export const appName = "re;fx"; // on env cant put ; sob
export const appUrl = env.PUBLIC_APP_URL;
export const apiUrl = env.PUBLIC_API_URL;
export const avatarUrl = env.PUBLIC_AVATAR_URL;
