import {SignJWT, jwtVerify, type JWTPayload} from 'jose';

export interface tokenPayload{
    userId: string | undefined;
    adminId: string | undefined;
    role: string;
    exp: string;
    iat: string;
    nbf: string;
}

export async function sign(payload: JWTPayload, secret: string): Promise<string> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60*60*24*7;

    return new SignJWT({...payload})
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret));
}

export async function verify(token: string | undefined, secret: string): 
Promise<tokenPayload> {
    const {payload} = await jwtVerify(token!, new TextEncoder().encode(secret));
    const tokenPayload = payload as unknown as tokenPayload;
    return tokenPayload;
}