import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { MovieGenre, Prisma, Movie } from "@prisma/client";
import { MovieProps } from "@/components/Cards";

export async function POST(req: NextRequest){

    try{
        const currentYear = new Date().getFullYear();

        var movies: Movie[] = await prisma.$queryRaw`
            SELECT * FROM Movie WHERE pubYear = ${currentYear};
        `;

        if (movies.length === 0) {
            return NextResponse.json({ message: "No movies found for the current year" }, 
            { status: 404 });
        }

        const movieIds = movies.map(movie => movie.movieId);

        var movieGenres: MovieGenre[] = await prisma.$queryRaw`
            SELECT * FROM MovieGenre WHERE movieId IN (${Prisma.join(movieIds)});
        `;

        if (movieGenres.length === 0) {
            return NextResponse.json({ message: "No genres found for the movies" }, 
                { status: 404 });
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    const movieGenresMap = movieGenres.reduce((acc: Map<string, Array<string>>, 
        movieGenre: MovieGenre) => {
        if (!acc.get(movieGenre.movieId)){
            acc.set(movieGenre.movieId, []);
        }
        acc.get(movieGenre.movieId)?.push(movieGenre.genreName);
        return acc;
    }, new Map<string, Array<string>>());

    const retMovies: MovieProps[] = [];

    movies.forEach(movie => {
        retMovies.push({
            key:movie.movieId,
            movieId: movie.movieId,
            title: movie.title,
            pubYear: movie.pubYear,
            ageRating: movie.ageRating,
            duration: movie.duration,
            genres: movieGenresMap.get(movie.movieId) || []
        });
    });

    return NextResponse.json(retMovies, {status: 200});
}