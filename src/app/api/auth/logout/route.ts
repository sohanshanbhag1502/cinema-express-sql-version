import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest){
    const cookieStore = cookies();

    if (!req.cookies.get("auth-token")){
        return NextResponse.json({message:"User not logged in"}, {status: 401});
    }

    cookieStore.set("auth-token", "", {maxAge: 0});
    return NextResponse.json({message:"Successfully logged out"}, {status: 200});
}