import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ data }) => {
    return {
        app: data.app,
        nav: data.nav,
    };
};