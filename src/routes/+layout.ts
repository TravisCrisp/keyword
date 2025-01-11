import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ data }) => {
    return {
        project: data.project,
        nav: data.nav,
    };
};