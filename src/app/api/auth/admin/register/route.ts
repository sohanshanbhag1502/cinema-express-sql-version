import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import AdminSchema from "@/lib/models/admin";
import prisma from "@/prisma/client";
import { Admin } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    body.dob= new Date(body.dob);
    const validation = AdminSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json({error:validation.error.errors}, {status: 400});
    }

    try{
        const adminId = validation.data.adminId;

        const admin: Admin[] = await prisma.$queryRaw`
            SELECT * FROM Admin WHERE adminId = ${adminId} LIMIT 1;
        `;

        if(admin.length > 0){
            return NextResponse.json({message: "Admin already exists"}, {status: 409});
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    try{
        const { adminId, name, email, passwd } = validation.data;

        await prisma.$executeRaw`
            CALL addAdmin(${adminId}, ${name}, ${email}, ${passwd});
        `;

    }
    catch(e){
        return NextResponse.json({message:"Admin already exists"}, 
            {status:500})
    }

    return NextResponse.json({message:"Admin Registered Successfully"}, {status: 201});
}