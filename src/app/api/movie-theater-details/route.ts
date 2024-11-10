import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { HostMovie, Movie, Theater } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {movieId, theaterId, cost} = body;

    if (!movieId || !theaterId){
        return NextResponse.json({message: "Invalid Details for the request"}, 
            {status: 400});
    }

    try{
        var movie: Movie[] = await prisma.$queryRaw`
            SELECT * FROM Movie WHERE movieId = ${movieId} LIMIT 1
        `;

        if (movie.length === 0){
            return NextResponse.json({ message: "Movie not found" }, { status: 404 });
        }

        var theater: Theater[] = await prisma.$queryRaw`
            SELECT * FROM Theater WHERE theId = ${theaterId} LIMIT 1
        `;

        if (theater.length === 0){
            return NextResponse.json({ message: "Theater not found" }, { status: 404 });
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    if (cost){
        try{
            var costs: HostMovie[] = await prisma.$queryRaw`
                SELECT cost FROM HostMovie WHERE movieId = ${movieId} AND
                theId = ${theaterId} LIMIT 1
            `;
        }
        catch(e){
            return NextResponse.json({message:"Unable to connect to database"}, 
                {status:500})
        }
        return NextResponse.json({movie:movie[0], theater:theater[0], cost:costs[0].cost}, 
            {status: 200});
    }

    return NextResponse.json({movie:movie[0], theater:theater[0]}, {status: 200});
}