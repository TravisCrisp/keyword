import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { RouteTrie } from "$lib/utilities/navTrie";
import { populateTrie } from "$lib/utilities/navTrie";

export const load: LayoutServerLoad = async ({ params, route, url }) => {

        const project = {
        name: "Template",
        description: "build anything",
    };

    const allowedRoutes = ["about", "contact", "privacy-policy", "terms-of-service", {"test": ["test1", "test2"]}];

    const routeTrie = new RouteTrie();
    populateTrie(allowedRoutes, "", routeTrie);

    if (!routeTrie.search(url.pathname)) {
        return error(404, new Error("Page not found"));
    }

    const nav = {
        header: [
            {label: "Products", href: "/products"},
        ],
        footer: [
            {label: "About", href: "/about"},
            {label: "Contact", href: "/contact"},
            {label: "Privacy Policy", href: "/privacy-policy"},
            {label: "Terms of Service", href: "/terms-of-service"},
        ],
    };

    return {
        nav: nav,
        project: project,
    };
};