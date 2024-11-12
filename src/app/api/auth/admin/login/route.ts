import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {AdminLogin} from "@/lib/models/admin";
import prisma from "../../../../../prisma/client";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { sign } from "@/lib/JWT";
import { Admin } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const validation = AdminLogin.safeParse(body);
    if(!validation.success){
        return NextResponse.json({error:validation.error.errors}, {status: 400});
    }

    try{
        const adminId = validation.data.adminId;
        var admin: Admin[] = await prisma.$queryRaw`
            SELECT * FROM Admin WHERE adminId = ${adminId} LIMIT 1;
        `;
        var authenticated: {auth:boolean}[] = await prisma.$queryRaw`
            SELECT authAdmin(${validation.data.adminId}, ${validation.data.passwd}) AS auth;
        `

        if (admin.length === 0) {
            return NextResponse.json({ message: "Admin not Registered" }, 
                { status: 404 });
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    const {adminId} = validation.data;

    if (authenticated[0].auth) {
        const CookieStore=cookies();
        const token=await sign({adminId, role:"admin"}, process.env.JWT_SECRET!);
        CookieStore.set("auth-token", token, {httpOnly: true, path: "/", 
            sameSite: "strict", maxAge: 60*60*24*7});
        return NextResponse.json(admin[0], {status: 200});
    }
    else{
        return NextResponse.json({message: "Invalid Password"}, {status: 401});
    }
}