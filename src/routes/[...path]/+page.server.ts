import { getCache } from '$lib/server/redisCache';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { supabase, session } }) => {

    if (session && url.pathname == "/sign-out") {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }
        redirect(303, '/');
    }

    const { data: applications, error: applicationsError } = await supabase.from('app').select('*').order('selected', { ascending: false });
    const { data: selectedApplication, error: selectedApplicationError } = await supabase.rpc('get_application', { application_id: applications[0].id });

    const applicationData = await getCache();
    const page = applicationData.pages[url.pathname];
    if (!page) {
        throw error(404, "Page not found");
    };
    // console.log(page);

    return {
        page: page,
        applications: applications,
        selectedApplication: selectedApplication,
    };
};

export const actions: Actions = {
    signin: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);

        const { error } = await supabase.auth.signInWithPassword({
            email: data.email as string,
            password: data.password as string,
        });

        if (error) {
            throw error;
        }
        redirect(303, "/dashboard")
    },

    signup: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);

        const { error } = await supabase.auth.signUp({
            email: data.email as string,
            password: data.password as string,
        });

        if (error) {
            throw error;
        }
        redirect(303, "/sign-in")
    },

    signout: async ({ request, locals: { supabase } }) => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }
        redirect(303, "/sign-in");
    },

    updatePassword: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        console.log(data);
    },

    createApplication: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        console.log(data);
    },

    updateApplication: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        console.log(data);
    },

    deleteApplication: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        console.log(data);
    },

    createPage: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        console.log(data);
    },

    updatePage: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        console.log(data);
    },

    deletePage: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        console.log(data);
    },
};