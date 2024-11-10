import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import TheaterSchema from "@/lib/models/theater";
import type { Theater } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const validation = TheaterSchema.safeParse(body);

    if (!validation.success){
        return NextResponse.json({error: validation.error.errors}, {status: 400});
    }

    try{
        const theId = validation.data.theId;
        const etheater: Theater[] = await prisma.$queryRaw`
            SELECT * FROM Theater WHERE theId = ${theId} LIMIT 1;
        `;
        if (etheater.length > 0) {
            return NextResponse.json({ message: "Theater already exists" }, 
                { status: 409 });
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    try{
        const { theId, name, city, address } = validation.data;
        await prisma.$executeRaw`
            INSERT INTO Theater (theId, name, city, address)
            VALUES (${theId}, ${name}, ${city}, ${address})
        `;
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json({message:"Theater Created Successfully"}, {status: 200});
}