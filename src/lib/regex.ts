export const removeClanTag = (str: string) => str.replace(/^\[[^\]]*?\]\s/g, '');

export const removeTrailingZeroes = (number: number) =>
	number >= 100 ? number.toFixed(2).replace(/\.?00$/gm, '') : number.toFixed(2);

export const usernameRegex = /^(?=.{2,20}$)[a-zA-Z0-9]+(?:[- ][a-zA-Z0-9]+)*$/;
