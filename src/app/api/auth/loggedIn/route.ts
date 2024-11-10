import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { verify } from "@/lib/JWT";
import { tokenPayload } from "@/lib/JWT";

export async function POST(req: NextRequest){
    const cookieStore = cookies();
    const token = cookieStore.get("auth-token");

    if (!token){
        return NextResponse.json({message: "Not logged in"}, {status: 401});
    }
    else{
        var obj : tokenPayload;
        try{
            obj = await verify(token.value, process.env.JWT_SECRET!);
        }
        catch (error){
            cookieStore.set("auth-token", "", {expires: new Date(0)});
            return NextResponse.json({message: "Invalid Token"}, {status: 401});
        }
        return NextResponse.json({message: "Logged In", id:obj.userId?obj.userId:
            obj.adminId}, {status: 200});
    }
}