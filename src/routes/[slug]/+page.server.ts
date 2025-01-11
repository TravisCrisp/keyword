import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, route, url }) => {

    const page = {
        h2: 'Page header',
        p: 'Page content',
    };

    const meta = {
        title: 'Page',
        description: 'Page description',
        robots: 'noindex, nofollow',
        schema: 'WebPage',
    };

    return {
        page: page,
        meta: meta,
    }
};