import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import MovieSchema from "@/lib/models/movie";
import { Movie } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const validation = MovieSchema.safeParse(body);

    if (!validation.success){
        return NextResponse.json({error: validation.error.errors}, {status: 400});
    }

    try{
        var emovie: Movie[] = await prisma.$queryRaw`
            SELECT * FROM Movie WHERE movieId = ${validation.data.movieId} LIMIT 1;
        `;
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }
    if (emovie.length>0){
        return NextResponse.json({message: "Movie already exists"}, {status: 409});
    }

    try{
        const { movieId, title, description, duration, ageRating, pubYear, rating, 
            ratingCount, languages, genres, casts } = validation.data;

        await prisma.$executeRaw`
            INSERT INTO Movie (movieId, title, description, duration, ageRating, pubYear, rating, ratingCount)
            VALUES (${movieId}, ${title}, ${description}, ${duration}, ${ageRating}, ${pubYear}, ${rating}, ${ratingCount})
        `;

        await prisma.$executeRaw`
            INSERT INTO movieLang (movieId, lang)
            VALUES ${languages.map((language) => `(${movieId}, ${language})`).join(', ')}
        `;

        await prisma.$executeRaw`
            INSERT INTO movieGenre (movieId, genreName)
            VALUES ${genres.map((genre) => `(${movieId}, ${genre})`).join(', ')}
        `;

        await prisma.$executeRaw`
            INSERT INTO movieCast (movieId, castId)
            VALUES ${casts.map((castId) => `(${movieId}, ${castId})`).join(', ')}
        `;

    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json({message:"Movie added successfully"}, {status: 200});
}