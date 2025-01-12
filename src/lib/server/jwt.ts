import { SignJWT } from 'jose';
import { PRIVATE_SUPABASE_JWT_SECRET } from '$env/static/private';

export async function generateAppToken(application_id: string): Promise<string> {
    if (!PRIVATE_SUPABASE_JWT_SECRET) {
        throw new Error('Missing JWT secret');
    }

    // Create a Uint8Array from the secret (required by `jose`)
    const secret = new TextEncoder().encode(PRIVATE_SUPABASE_JWT_SECRET);

    // Generate the JWT
    const token = await new SignJWT({ application_id: application_id })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })  // Use HMAC with SHA-256
        .setIssuedAt()                        // Set the issued-at time
        .setExpirationTime('1h')              // Token expires in 1 hour
        .sign(secret);

    return token;
}