import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Cast, Movie, MovieCast, MovieGenre, MovieLang, Prisma } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {movieId} = body;

    if (!movieId){
        return NextResponse.json({message: "Movie ID is required"}, {status: 400});
    }

    try{
        var movie: Movie[] = await prisma.$queryRaw`
            SELECT * FROM Movie WHERE movieId = ${movieId} LIMIT 1
        `;

        if (movie.length === 0){
            return NextResponse.json({ message: "Movie not found" }, 
                { status: 404 });
        }

        var movieLangs: MovieLang[] = await prisma.$queryRaw`
            SELECT lang FROM MovieLang WHERE movieId = ${movieId}
        `;

        var movieGenres: MovieGenre[] = await prisma.$queryRaw`
            SELECT genreName FROM MovieGenre WHERE movieId = ${movieId}
        `;

        var movieCastIds: MovieCast[] = await prisma.$queryRaw`
            SELECT castId FROM MovieCast WHERE movieId = ${movieId}
        `;
        const movieCastId = movieCastIds.map((movie) => movie.castId)

        var movieCasts: Cast[] = await prisma.$queryRaw`
            SELECT * FROM Cast WHERE castId IN (${Prisma.join(movieCastId)})
        `;
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json({movie:movie[0], 
        lang:movieLangs.map((movielang) => movielang.lang), casts:movieCasts,
        genres:movieGenres.map((genre) => genre.genreName)}, {status: 200});
}