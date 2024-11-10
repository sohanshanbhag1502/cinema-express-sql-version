import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {UserLogin} from "@/lib/models/user";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { sign } from "@/lib/JWT";
import type { User } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const validation = UserLogin.safeParse(body);
    if(!validation.success){
        return NextResponse.json({error:validation.error.errors}, {status: 400});
    }

    try{
        const userId = validation.data.userId;
        var user: User[] = await prisma.$queryRaw`
            SELECT * FROM User WHERE userId = ${userId} LIMIT 1;
        `;
        if (user.length === 0) {
            return NextResponse.json({message: "User not Registered"}, {status: 404});
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    const {userId, passwd} = user[0];

    if (await bcrypt.compare(validation.data.passwd, passwd)) {
        const CookieStore=cookies();
        const token=await sign({userId, role:"user"}, process.env.JWT_SECRET!);
        CookieStore.set("auth-token", token, {httpOnly: true, path: "/",
            sameSite: "strict", maxAge: 60*60*24*7});
        return NextResponse.json(user[0], {status: 200});
    }
    else{
        return NextResponse.json({message: "Invalid Password"}, {status: 401});
    }
}