import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ data }) => {

    return {
        meta: data.meta,
        page: data.page,
    };
};