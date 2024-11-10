import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import type { User } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    body.dob?body.dob= new Date(body.dob):undefined;

    const userId = body.userId;
    body.userId = undefined;

    try{
        const user: User[] = await prisma.$queryRaw`
            SELECT * FROM User WHERE userId = ${userId} LIMIT 1
        `;
        if(user.length === 0){
            return NextResponse.json({message: "User does not exist"}, {status: 409});
        }
        const { name, email, phNum, dob, passwd, gender } = body;

        await prisma.$executeRaw`
            UPDATE User
            SET 
                name = ${name},
                email = ${email},
                phNum = ${phNum},
                dob = ${dob},
                passwd = ${passwd},
                gender = ${gender}
            WHERE userId = ${userId}
        `;
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json({message: "User profile updated successfully"}, 
        {status: 200});
}