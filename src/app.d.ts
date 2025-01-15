/// <reference types="@sveltejs/kit" />

declare global {
	namespace App {
		interface ApplicationData {
			nav: Array<{
				name: string;
				items: Array<any>;
			}>;
			pages: Record<string, any>;
		}
	}
}

export {};
