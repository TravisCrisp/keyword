import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, route }) => {

    const page = {
        h2: "Page header",
        p: "Page content",
    };

    const meta = {
        title: 'Page',
        description: 'Page description',
        robots: 'index, no-follow',
        schema: 'LocalBusiness',
    };

    return {
        meta: meta,
        page: page,
    };
};