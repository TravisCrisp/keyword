import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ data }) => {

    return {
        meta: data.meta,
        nav: data.nav,
        page: data.page,
        project: data.project,
    };
};