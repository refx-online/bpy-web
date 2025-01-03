import DE from './languages/DE';
import US from './languages/US';
import ID from './languages/ID';

export type Language = {
	name: string;
	code: string;
	aliases?: string[];
	translator: string;
	phrases: { [key: string]: string };
};

export const languages: Language[] = [US, ID, DE];

export const getLanguage = (code: string) =>
	languages.find((lang) => lang.code === code.toUpperCase()) ||
	languages.find((lang) => lang.aliases?.includes(code.toUpperCase()));

export const __ = (
	key: string,
	lang: string,
	placeholders?: { [key: string]: string | number }
) => {
	const language = getLanguage(lang);
	let translation = language?.phrases[key] ?? key;
	if (placeholders) {
		// Replace placeholders in the translation string
		Object.keys(placeholders).forEach((placeholder) => {
			translation = translation.replace(
				new RegExp(`{{${placeholder}}}`, 'g'),
				placeholders[placeholder].toString()
			);
		});
	}
	return translation;
};
