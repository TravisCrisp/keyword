import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export async function getApplication(application_id: string, jwt: string, function_name: string) {
    const response = await fetch(`${PUBLIC_SUPABASE_URL}/rest/v1/rpc/${function_name}`, {
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