import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { tokenPayload, verify } from '@/lib/JWT';

export async function middleware(req: NextRequest) {
    const path = new URL(req.url).pathname;
    const cookie = req.cookies.get('auth-token');
    if (cookie && cookie.value){
        var payload : tokenPayload | null = null;
        try{
            payload = await verify(cookie.value, 
                process.env.JWT_SECRET!);
        } catch (e) {
            if (path.includes('/user')){
                return NextResponse.redirect(new URL('/login', req.url));
            }
            else if (path.includes('/admin')){
                return NextResponse.redirect(new URL('/admin/login', req.url));
            }
        }
        if (payload){
            if (payload.role === 'user' && (path==='/login' || path==='/register')){
                return NextResponse.redirect(new URL('/user/profile', req.url));
            }
            else if (payload.role === 'admin' && (path==='/admin/login' || 
                path==='/admin/register')){
                return NextResponse.redirect(new URL('/admin', req.url));
            }
            else if (payload.role === 'admin' && (path.startsWith('/user')
            || path.startsWith('/api/user'))){
                return NextResponse.redirect(new URL('/admin', req.url));
            }
            else if (payload.role === 'user' && (path.startsWith('/admin')
            || path.startsWith('/api/admin'))){
                return NextResponse.redirect(new URL('/user/profile', req.url));
            }
        }
        else if (path.includes('/user')){
            return NextResponse.redirect(new URL('/login', req.url));
        }
        else if (path.includes('/admin')){
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }
    }
    else if (path.startsWith('/user') && !(path==='/login')
        && !(path==='/register')){
        return NextResponse.redirect(new URL('/login', req.url));
    }
    else if (path.startsWith('/admin') && !(path==='/admin/login')
        && !(path==='/admin/register')){
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }   
    return NextResponse.next();
}