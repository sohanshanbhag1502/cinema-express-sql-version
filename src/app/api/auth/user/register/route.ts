import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import UserSchema from "@/lib/models/user";
import prisma from "@/prisma/client";
import type { User } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    body.dob= new Date(body.dob);
    const validation = UserSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json({error:validation.error.errors}, {status: 400});
    }

    try{
        const userId = validation.data.userId;
        var user: User[] = await prisma.$queryRaw`
            SELECT * FROM User WHERE userId = ${userId} LIMIT 1
        `;

        if(user.length > 0){
            return NextResponse.json({message: "User already exists"}, 
                {status: 409});
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    const dob = new Date(validation.data.dob).toISOString().split('T')[0];
    const { userId, name, email, phNum, passwd, gender } = validation.data;

    try{
        await prisma.$executeRaw`
            CALL addUser(${userId}, ${name}, ${email}, ${phNum}, ${dob}, ${passwd}, ${gender});
        `;
    }
    catch(e){
        return NextResponse.json({message:"User already exists"}, 
            {status:409})
    }

    return NextResponse.json({message: "User registered successfully"}, {status: 200});
}