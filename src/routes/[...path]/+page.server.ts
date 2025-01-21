import { getCache } from '$lib/server/redisCache';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { sortPagesByPath } from '$lib/utilities/sort';
import { buildNavMap, buildPageMap } from '$lib/utilities/hashMap';

export const load: PageServerLoad = async ({ url, locals: { supabase, session } }) => {

    const applicationData = await getCache();
    const page = applicationData.pages[url.pathname];
    if (!page && url.pathname != "/sign-out") {
        throw error(404, "Page not found");
    };
    
    let applications = [];
    let selectedApplication = {};

    if (session) {  
        if (url.pathname == "/sign-out") {
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw error;
            }
            redirect(303, '/');
        }
        if (url.pathname == "/sign-in" || url.pathname == "/sign-up") {
            redirect(303, '/dashboard');
        }
        const { data: appsData, error: applicationsError } = await supabase.from('app').select('*').order('selected', { ascending: false });
        applications = appsData || [];
        if (applications.length > 0) {
            const { data: selectedApp, error: selectedApplicationError } = await supabase
            .from('app')
            .select('*, page_map: page(*), nav_map: nav(*), theme: theme(*), template(*), page(*, layout(*),parents: page_hierarchy!page_hierarchy_child_id_fkey(*), children: page_hierarchy!page_hierarchy_parent_id_fkey(*), nav_page(*), page_schema(*), content(*)), nav(*, nav_page(*))')
            .eq('id', applications[0].id)
            .single();
            selectedApp.page = sortPagesByPath(selectedApp.page);
            selectedApp.page_map = buildPageMap(selectedApp.page_map);
            selectedApp.nav_map = buildNavMap(selectedApp.nav_map);
            selectedApplication = selectedApp
            // console.log(selectedApp.page)
        }
    }

    return {
        page: page,
        applications: applications,
        selectedApplication: selectedApplication,
    };
};

export const actions: Actions = {

    // Auth
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

    sendPasswordReset: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        const { error } = await supabase.auth.resetPasswordForEmail(data.email as string, {
            redirectTo: 'http://localhost:5173/reset-password'
        });
        if (error) {
            throw error;
        }
    },

    updatePassword: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        console.log(data);
    },

    // Application
    // createApplication: async ({ request }) => {
    //     const formData = await request.formData();
    //     const data = Object.fromEntries(formData);
    //     console.log(data);
    // },

    // updateApplication: async ({ request }) => {
    //     const formData = await request.formData();
    //     const data = Object.fromEntries(formData);
    //     console.log(data);
    // },

    // deleteApplication: async ({ request, locals: { supabase } }) => {
    //     const formData = await request.formData();
    //     const data = Object.fromEntries(formData);
    //     const returnData = await deleteData(supabase, 'app', data);
    //     console.log(data);
    // },

    // Page
    createPage: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        
        // Extract the non-page data for hierarchy and content
        const parent_id = data.parent_id ? data.parent_id : null;
        const header = data.header ? data.header : null;
        const paragraph = data.paragraph ? data.paragraph : null;
        delete data.parent_id;
        delete data.header;
        delete data.paragraph;

        // Create the page
        const { data: pageData, error: pageError } = await supabase.from('page').insert(data).select().single();
        if (pageError) {
            throw pageError;
        };

        // Create the hierarchy
        if (parent_id) {
            const { data: hierarchyData, error: hierarchyError } = await supabase.from('page_hierarchy').insert({
                parent_id: parent_id,
                child_id: pageData.id,
                app_id: data.app_id
            });
            if (hierarchyError) {
                throw hierarchyError;
            };
        };

        // Create the header
        if (header) {
            const { data: headerData, error: headerError } = await supabase.from('content').insert({
                page_id: pageData.id,
                app_id: data.app_id,
                tag: 'h2',
                content: header
            });
            if (headerError) {
                throw headerError;
            };
        };

        // Create the paragraph
        if (paragraph) {
            const { data: paragraphData, error: paragraphError } = await supabase.from('content').insert({
                page_id: pageData.id,
                app_id: data.app_id,
                tag: 'p',
                content: paragraph
            });
            if (paragraphError) {
                throw paragraphError;
            };
        };

        return pageData;
    },

    updatePage: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        const { data: pageData, error: pageError } = await supabase.from('page').update({
            data
        }).eq('id', data.id);
        if (pageError) {
            throw pageError;
        }
        return pageData;
    },

    deletePage: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);

        // Delete the page and all descendants
        const { data: pageData, error: pageError } = await supabase.from('page').delete().eq('app_id', data.app_id).like('path', `${data.path}%`);
        console.log(pageData, pageError);
        if (pageError) {
            throw pageError;
        }
        return pageData;
    },
};