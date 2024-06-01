import type { TelegramWebApps } from 'telegram-webapps-types';

declare global {

	interface Window {
		Telegram: TelegramWebApps.SDK;
	}

	namespace NodeJS {
		interface ProcessEnv {
			BOT_TOKEN: string;
		}
	}
}

export {};