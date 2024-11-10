import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import CastSchema from "@/lib/models/cast";
import { Cast } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const validation = CastSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json({error: validation.error.errors}, {status: 400});
    }
    try{
        var ecast:Cast[] = await prisma.$queryRaw`
            SELECT * FROM Cast WHERE castId = ${validation.data.castId} LIMIT 1;
        `;
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }
    if (ecast.length>0){
        return NextResponse.json({message: "Cast already exists"}, {status: 409});
    }

    try{
        const { castId, name, biolink, role } = validation.data;
        await prisma.$executeRaw`
            INSERT INTO Cast (castId, name, biolink, role)
            VALUES (${castId}, ${name}, ${biolink}, ${role})
        `;
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json({message:"Cast Created Successfully"}, 
        {status: 200});
}