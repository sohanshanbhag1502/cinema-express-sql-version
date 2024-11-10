import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { verify } from "@/lib/JWT";
import type { User } from ".prisma/client";

export async function POST(req: NextRequest){
    const token = req.cookies.get("auth-token");
    try{
        var payload = await verify(token?.value, process.env.JWT_SECRET!);
    }
    catch(e){
        return NextResponse.json({message:"Invalid Auth Token"}, 
            {status:401})
    }

    const userId = payload.userId;
    try{
        var user: User[] = await prisma.$queryRaw`
            SELECT * FROM User WHERE userId = ${userId} LIMIT 1;
        `;
        if(user.length === 0){
            return NextResponse.json({message: "User does not exist"}, {status: 409});
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json(user[0], {status: 200});
}