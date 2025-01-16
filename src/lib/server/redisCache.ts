import { Redis } from "@upstash/redis";
import { getApplication } from "./supabase";
import { PUBLIC_CACHE_NAME } from '$env/static/public';
import { APPLICATION_ID } from "$env/static/private";
import { generateAppToken } from "./jwt";
import { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } from "$env/static/private";
import { buildNavMap, buildPageMap } from "$lib/utilities/hashMap";

const redis = new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN
});

export async function setCache() {
    const jwt = await generateAppToken(APPLICATION_ID);
    const appData = await getApplication(APPLICATION_ID, jwt, "get_application");
    appData.pages = buildPageMap(appData.pages);
    appData.nav = buildNavMap(appData.nav);
    await redis.set(PUBLIC_CACHE_NAME, JSON.stringify(appData));
};

export async function getCache() {
    let cache = await redis.get<string>(PUBLIC_CACHE_NAME);

    if (!cache) {
        const jwt = await generateAppToken(APPLICATION_ID);
        const appData = await getApplication(APPLICATION_ID, jwt, "get_application");
        appData.pages = buildPageMap(appData.pages);
        appData.nav = buildNavMap(appData.nav);
        await redis.set(PUBLIC_CACHE_NAME, JSON.stringify(appData));
        cache = JSON.stringify(appData);
    }

    return cache;
};