import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { RouteTrie } from "$lib/utilities/navTrie";
import { populateTrie } from "$lib/utilities/navTrie";
import { PRIVATE_SUPABASE_APPLICATION_ID, PRIVATE_SUPABASE_JWT_SECRET } from "$env/static/private";
// import { createSupabaseClientWithToken } from "$lib/server/supabase";
import { createSupabaseClient } from "$lib/server/supabase";
import { generateAppToken } from "$lib/server/jwt";
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";

export const load: LayoutServerLoad = async ({ params, route, url }) => {

    const application_id = PRIVATE_SUPABASE_APPLICATION_ID;
    const token = await generateAppToken(PRIVATE_SUPABASE_APPLICATION_ID);
    console.log(token);
    console.log(PRIVATE_SUPABASE_JWT_SECRET);
    // const supabase = createSupabaseClientWithToken(token);
    const supabase = createSupabaseClient();

    async function getApplication(application_id, jwt) {
        const response = await fetch(`${PUBLIC_SUPABASE_URL}/rest/v1/rpc/get_application`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'apikey': PUBLIC_SUPABASE_ANON_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ application_id })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Error: ${error.message}`);
        }

        const data = await response.json();
        return data;
    }
    const applicationData = await getApplication(application_id, token);
    console.log('Application data:', applicationData);

        const project = {
        name: "Template",
        description: "build anything",
    };

    const allowedRoutes = ["/", "about", "contact", "privacy-policy", "terms-of-service", {"test": ["test1", "test2"]}];

    const routeTrie = new RouteTrie();
    populateTrie(allowedRoutes, "", routeTrie);

    if (!routeTrie.search(url.pathname)) {
        throw error(404, "Page not found");
    }

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