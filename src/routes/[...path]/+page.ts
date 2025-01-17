import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ data }) => {

    return {
        page: data.page,
        applications: data.applications,
    };
};