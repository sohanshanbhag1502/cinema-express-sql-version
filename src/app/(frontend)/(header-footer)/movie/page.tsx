"use client"

import { useSearchParams, useRouter } from 'next/navigation';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Rating from '@mui/material/Rating';
import { CastComp, Crew } from '@/components/Categories';
import { useEffect, useState } from 'react';
import type { Cast, Movie } from '@prisma/client';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { context } from '@/components/Body';

export default function MoviePage(){
    const router=useRouter();
    const params=useSearchParams();
    const { enqueueSnackbar } = useSnackbar();
    const {} = useContext(context);

    const [movieDetails, setMovieDetails]=useState<Movie>();
    const [movieLangs, setMovieLangs]=useState<Array<string>>();
    const [movieCasts, setMovieCasts]=useState<Array<Cast>>();
    const [movieGenres, setMovieGenres]=useState<Array<string>>();
    const [rating, setRating]=useState<number>(0);
    const setLoading = useContext(context);


    const id=params.get('movieId');

    const fetchMovie=async()=>{
        setLoading(true);
        const res=await fetch('/api/movie-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieId: id
            })
        });
        try{
            var data = await res.json();
        }
        catch(e){
            enqueueSnackbar("Sorry unable to reach the server at the moment.", 
            {variant:"error"});
            setLoading(false);
            return
        }
        if (res.status!==200){
            enqueueSnackbar('Invalid Movie Id Provided', { variant: 'error' });
            router.push('/');
            setLoading(false);
            return;
        }
        console.log(data);
        setMovieDetails(data.movie);
        setMovieGenres(data.genres);
        setMovieLangs(data.lang);
        setMovieCasts(data.casts);
        setRating(data.movie.rating);
        setLoading(false);
    }

    useEffect(()=>{ fetchMovie() }, [id]);

    return (
        <div className="w-full flex flex-col items-start content-center justify-start
        p-10">
            <div className='w-full flex items-center content-center flex-wrap'>
                <CldImage alt={movieDetails?.title!} src={id!+'.avif'}
                height={400} width={250} className='border-[0.25px] border-white rounded-xl'/>
                <div className='w-[80%] pl-10 flex flex-col items-start content-center'>
                    <div className='w-full flex items-center content-center justify-between'>
                        <h1 className="text-4xl">{movieDetails?.title} ({movieDetails?.pubYear})</h1>
                        <Link className='p-2 bg-white text-black border-white border-2
                        font-semibold text-xl rounded-full transition-all duration-200
                        hover:bg-black hover:text-white' href={{
                            pathname: '/user/book-tickets',
                            query: { movieId: id }
                        }}>
                            Book Your Tickets
                        </Link>
                    </div>
                    <p className='font-medium text-lg flex content-center pt-2'>
                        <Rating value={rating} precision={0.1} readOnly/> 
                        ({movieDetails?.ratingCount}K)
                    </p>
                    <p className='font-medium text-lg flex content-center pt-2
                    items-center justify-center'>
                        <AccessTimeIcon />&nbsp;
                        {movieDetails?.duration}
                    </p>
                    <p className="text-xl font-medium left-4 bg-pink-600 my-4 p-1
                    bg-opacity-60">
                        {movieDetails?.ageRating.replace('plus', '+')}
                    </p>
                    <p className='font-medium text-lg py-1'>
                        {movieGenres?.join(', ')}
                    </p>
                    <p className='py-4 font-medium text-lg'>
                        {movieDetails?.description}
                    </p>
                    <p className='font-medium text-lg'>
                        Languages Available: {movieLangs?.join(', ')}
                    </p>
                    <p className='font-medium text-lg py-1'>
                        Formats Available: 2D, 3D, 4D
                    </p>
                </div>
                <div className='w-full flex flex-col items-center content-center justify-center
                mt-10'>
                    <h2 className='w-full text-3xl font-semibold'>Film Cast</h2>
                    <CastComp stars={movieCasts}/>
                </div>
                <div className='w-full flex flex-col items-center content-center justify-center
                mt-10'>
                    <h2 className='w-full text-3xl font-semibold'>Film Crew</h2>
                    <Crew stars={movieCasts}/>
                </div>
            </div>
        </div>
    )
}