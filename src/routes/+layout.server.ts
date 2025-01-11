import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { RouteTrie } from "$lib/utilities/navTrie";
import { populateTrie } from "$lib/utilities/navTrie";

export const load: LayoutServerLoad = async ({ params, route, url }) => {

    console.log ("Params", params.path, "url", url, "route", route);

        const project = {
        name: "Template",
        description: "build anything",
    };

    // const allowedRoutes = ["/", "about", "contact", "privacy-policy", "terms-of-service", {"test": ["test1", "test2"]}];

    // const routeTrie = new RouteTrie();
    // populateTrie(allowedRoutes, "", routeTrie);

    // if (!routeTrie.search(url.pathname)) {
    //     return error(404, new Error("Page not found"));
    // }

    const nav = {
        header: [
            {label: "Products", href: "/products", children: [
                {label: "Product 1", href: "/products/product-1"},
                {label: "Product 2", href: "/products/product-2"},
            ]},
            {label: "Services", href: "/services", children: [
                {label: "Service 1", href: "/services/service-1"},
                {label: "Service 2", href: "/services/service-2"},
            ]},
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