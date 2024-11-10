import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { HostMovie, Movie, MovieGenre, MovieLang, Theater } from "@prisma/client";
import { MovieProps } from "@/components/Cards";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {movieTitle, city, genre, ageRating, language} = body;
    var res1: string[]=[];
    var res2: string[]=[];
    var res3: string[]=[];
    var res4: string[]=[];
    var res5: string[]=[];
    var resId: string[]=[];
    var res: Movie[]=[];
    var resGenres: MovieGenre[]=[];
    var retRes: Map<string, MovieProps>=new Map();
    var searchRes: Array<MovieProps>=[];

    try{
        if (movieTitle) {
            res1 = (await prisma.movie.findMany({
                where: {
                    title: {
                        contains: movieTitle.trim(),
                        mode: 'insensitive'
                    }
                }
            })).map((movie: Movie) => movie.movieId);
        }
        if (city) {
            res2 = (await prisma.theater.findMany({
                where: {
                    city
                }
            })).map((theater: Theater) => theater.theId);
            res2 = (await prisma.hostMovie.findMany({
                where: {
                    theId: {
                        in: res2
                    }
                }
            })).map((hostMovie:HostMovie) => hostMovie.movieId);
        }
        if (genre) {
            res3 = (await prisma.movieGenre.findMany({
                where: {
                    genreName:genre
                }
            })).map((movie:MovieGenre) => movie.movieId);
        }
        if (ageRating) {
            res4 = (await prisma.movie.findMany({
                where: {
                    ageRating
                }
            })).map((movie:Movie) => movie.movieId);
        }
        if (language) {
            res5 = (await prisma.movieLang.findMany({
                where: {
                    lang:language
                }
            })).map((movie:MovieLang) => movie.movieId);
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    if (!movieTitle){
        if (city){
            res1=res2
        }
        else if (genre){
            res1=res3
        }
        else if (ageRating){
            res1=res4
        }
        else if (language){
            res1=res5
        }
    }

    resId=res1.filter((movieId: string) => city?res2.includes(movieId):true)
        .filter((movieId: string) => genre?res3.includes(movieId):true)
        .filter((movieId: string) => ageRating?res4.includes(movieId):true)
        .filter((movieId: string) => language?res5.includes(movieId):true);

    if (resId){
        [res, resGenres]=await Promise.all([
            prisma.movie.findMany({
                where: {
                    movieId: {
                        in: resId
                    }
                }
            }),
            prisma.movieGenre.findMany({
                where: {
                    movieId: {
                        in: resId
                    }
                }
            })
        ])
        for (var movie of res){
            retRes.set(movie.movieId, {
                key:movie.movieId,
                movieId: movie.movieId,
                title: movie.title,
                pubYear: movie.pubYear,
                ageRating: movie.ageRating,
                duration: movie.duration,
                genres: []
            });
        }
        for (var movieGenre of resGenres){
            retRes.get(movieGenre.movieId)?.genres.push(movieGenre.genreName);
        }
        searchRes=Array.from(retRes.values());
    }

    return NextResponse.json(searchRes, {status: 200});
}