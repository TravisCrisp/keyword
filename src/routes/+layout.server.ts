import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { getCache } from "$lib/server/redisCache";
import { setCache } from "$lib/server/redisCache";

export const load: LayoutServerLoad = async ({ params, url }) => {

    const cache = await setCache();
    const applicationData = await getCache();
    if (!applicationData) {
        throw error(500, "Failed to load application data");
    }
    // console.log(applicationData);


    return {
        app: applicationData,
    };
};