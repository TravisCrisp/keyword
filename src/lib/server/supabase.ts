import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const createSupabaseClient = () => {
    return createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
};

// export const createSupabaseClientWithToken = (token: string) => {
//     const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
//     supabase.auth.setSession({ access_token: token, refresh_token: '' });
//     return supabase;
// };

