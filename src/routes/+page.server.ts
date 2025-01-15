import { getCache } from '$lib/server/redisCache';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {


    const applicationData = await getCache();
    const page = applicationData.pages[url.pathname];
    if (!page) {
        throw error(404, "Page not found");
    }
    // console.log(page);

    return {
        page: page,
    }
};