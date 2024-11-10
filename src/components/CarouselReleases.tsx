'use client'

import React, { useState, useEffect, useContext } from 'react';
import { MovieCard, MovieProps } from "@/components/Cards";
import { useSnackbar } from "notistack";
import { context } from '@/components/Body';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        '/image1.png',
        '/image2.png',
        '/image3.png'
    ]

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };
    
    useEffect(() => {
        const slideTimer = setInterval(nextSlide, 4000);
        return () => clearInterval(slideTimer);
    }, [currentIndex]);


    return (
        <div className="flex flex-col items-center w-full px-5">
            <div className="relative flex justify-center items-center overflow-hidden">

                <div className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {images.map((image, index) => (
                        <img
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        className="w-full h-full object-cover flex-shrink-0"
                        />
                    ))}
                </div>

                <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 
                    bg-black bg-opacity-50 text-white p-2 rounded-full text-3xl"
                    onClick={prevSlide}
                >
                    &lt;-
                </button>

                <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black 
                bg-opacity-50 text-white p-2 rounded-full text-3xl"
                onClick={nextSlide}
                >
                    -&gt;
                </button>
            </div>
            <div className="mt-4 flex space-x-2">
                    {images.map((_, index) => (
                    <span
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                        index === currentIndex ? 'bg-white' : 'bg-gray-400'
                        } cursor-pointer`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                    ))}
            </div>
        </div>
    );
};

export function Releases(){
    const [releases, setReleases] = useState<Array<MovieProps>>([]);
    const {enqueueSnackbar} = useSnackbar();
    const setLoader = useContext(context);

    const fetchAllReleases = async ()=>{
        setLoader(true);
        const res=await fetch('/api/fetch-releases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status===200){
            try{
                var data : MovieProps[] = await res.json();
            }
            catch (e){
                enqueueSnackbar("Sorry unable to reach the server at the moment.", 
                {variant:"error"});
                setLoader(false);
                return
            }
            setReleases(data);
        }
        else{
            enqueueSnackbar("Something went wrong while loading the page", 
                {variant: 'error'});
        }
        setLoader(false);
    }

    useEffect(()=>{ fetchAllReleases() },[]);

    return (
        <div className="w-full flex flex-col content-center justify-start items-start 
        my-4 text-left pl-4">
            <h3 className="text-3xl font-extrabold">New Releases</h3>
            <div className="w-full grid grid-flow-col justify-evenly gap-9 
            overflow-x-auto p-5">
                {releases.map((ele)=><MovieCard {...ele} key={ele.movieId}/>)}
            </div>
        </div>
    )
}

export default Carousel;