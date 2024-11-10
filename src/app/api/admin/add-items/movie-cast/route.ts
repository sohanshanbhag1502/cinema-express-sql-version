import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { Cast, Movie } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {movieId, castId} = body;

    try{
        const cast: Cast[] = await prisma.$queryRaw`
            SELECT * FROM Cast WHERE castId = ${castId} LIMIT 1;
        `;
        if (cast.length === 0){
            return NextResponse.json({message: "Cast does not exist"}, {status: 400});
        }
    }
    
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    try{
        const movie: Movie[] =  await prisma.$queryRaw`
            SELECT * FROM Movie WHERE movieId = ${movieId} LIMIT 1;
        `;
        if (movie.length === 0){
            return NextResponse.json({message: "Movie does not exist"}, {status: 400});
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    try{
        await prisma.$executeRaw`
            INSERT INTO movieCast (movieId, castId)
            VALUES (${movieId}, ${castId})
        `;
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json("Added cast to the movie successfully", {status: 200});
}