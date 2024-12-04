import { env } from '$env/dynamic/public';

export const appName = "re;fx"; // on env cant put ; sob
export const appUrl = env.PUBLIC_APP_URL;
export const apiUrl = env.PUBLIC_API_URL;
export const avatarUrl = env.PUBLIC_AVATAR_URL;

export const oauthSecret = env.OAUTH_SECRET;
export const oauthId = env.OAUTH_ID;

export const githubUrl = env.PUBLIC_GITHUB_URL
export const discordUrl = env.PUBLIC_DISCORD_SERVER_URL
export const youtubeUrl = env.PUBLIC_YOUTUBE_URL
export const twitterUrl = env.PUBLIC_TWITTER_URL