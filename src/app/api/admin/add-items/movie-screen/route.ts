import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import type { Screen, Theater, Movie } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {screenId, theId, movieId, cost, showtime} = body;

    if (!screenId || !theId || !movieId || !cost || !showtime){
        return NextResponse.json({message: "Invalid Request"}, {status: 400});
    }

    try{
        const screen: Screen[] = await prisma.$queryRaw`
            SELECT * FROM Screen WHERE screenId = ${screenId} LIMIT 1;
        `;
        if (screen.length === 0) {
            return NextResponse.json({ message: "Screen does not exist" }, { status: 404 });
        }

        const theater: Theater[] = await prisma.$queryRaw`
            SELECT * FROM Theater WHERE theId = ${theId} LIMIT 1;
        `;
        if (theater.length === 0) {
            return NextResponse.json({ message: "Theater does not exist" }, { status: 404 });
        }

        const movie: Movie[] = await prisma.$queryRaw`
            SELECT * FROM Movie WHERE movieId = ${movieId} LIMIT 1;
        `;
        if (movie.length === 0) {
            return NextResponse.json({ message: "Movie does not exist" }, { status: 404 });
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    try{
        await prisma.$executeRaw`
            INSERT INTO hostMovie (screenId, theId, movieId, cost, showtime)
            VALUES (${screenId}, ${theId}, ${movieId}, ${cost}, ${showtime})
        `;
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json({message:"Added movie to the screen successfully"}, 
        {status: 200});
}