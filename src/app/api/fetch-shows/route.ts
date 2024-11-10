import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Theater, Movie, HostMovie, Prisma } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {movieId, city} = body;

    if (!movieId && !city){
        return NextResponse.json({message: "Invalid Request Body"}, {status: 400});
    }

    try{
        const movie: Movie[] = await prisma.$queryRaw`
            SELECT * FROM Movie WHERE movieId = ${movieId} LIMIT 1;
        `;

        if (movie.length === 0) {
            return NextResponse.json({message: "Movie not found"}, {status: 404});
        }

        var theaters: Theater[] = await prisma.$queryRaw`
            SELECT * FROM Theater WHERE city = ${city};
        `;

        var theaterIds=theaters.map((val)=>val.theId)

        var shows : HostMovie[] = await prisma.$queryRaw`
            SELECT * FROM HostMovie 
            WHERE theId IN (${Prisma.join(theaterIds)})
            AND movieId = ${movieId};
        `;

        if (shows.length === 0) {
            return NextResponse.json({ message: 
                "No shows found for this movie in the selected theaters" }, 
            { status: 404 });
        }

        theaterIds=shows.map((val)=>val.theId)

        theaters = await prisma.$queryRaw`
            SELECT * FROM Theater WHERE theId IN 
            (${Prisma.join(theaterIds)});
        `;
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json({shows, theaters}, {status: 200});
}