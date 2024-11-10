"use client"

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { CldUploadButton } from 'next-cloudinary';
import { useSnackbar } from "notistack";

export default function AddMoviePage(){
    const {enqueueSnackbar} = useSnackbar();

    const [movieId, setMovieId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [ageRating, setAgeRating] = useState("");
    const [pubYear, setPubYear] = useState(0);
    const [rating, setRating] = useState("");
    const [ratingCount, setRatingCount] = useState(0);
    const [languages, setLanguages] = useState("");
    const [genres, setGenres] = useState("");
    const [casts, setCasts] = useState("");

    const handleMovieChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMovieId(e.target.value)
    }

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDescChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDuration(e.target.value)
    }

    const handleARChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAgeRating(e.target.value)
    }

    const handlePYChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPubYear(parseInt(e.target.value))
    }

    const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRating(e.target.value)
    }

    const handleRatingCChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRatingCount(parseInt(e.target.value))
    }

    const handleLangChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLanguages(e.target.value)
    }

    const handleGenreChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGenres(e.target.value)
    }

    const handleCastChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCasts(e.target.value)
    }

    const postMovie = async (e: FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const res=await fetch('/api/admin/add-items/movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieId,
                title,
                description,
                duration,
                ageRating,
                pubYear,
                rating:parseFloat(rating),
                ratingCount,
                languages:languages.split(", "),
                genres:genres.split(", "),
                casts:casts.split(", ")
            })
        });
        try{
            var message = await res.json();
        }
        catch (e){
            enqueueSnackbar("Sorry unable to reach the server at the moment.", 
            {variant:"error"});
            return
        }
        if (res.status===200){
            enqueueSnackbar("Added the Movie successfully", {variant: 'success'});
        }
        else if (message.error && message.error.length>0){
            enqueueSnackbar("Please check the details entered.", {variant: 'error'});
        }
        else{
            enqueueSnackbar("Something went wrong.", {variant: 'error'});
        }
    }

    return (
        <div className="w-full flex flex-col items-center content-center justify-center 
        p-10">
            <h1 className="font-bold text-4xl">Add Movie</h1>
            <div className="w-[50%] flex py-5 items-center content-center">
                <div className="w-[30%] flex flex-col items-start content-center">
                    <label className="text-2xl py-[0.8rem]">Movie ID :</label>
                    <label className="text-2xl py-[0.8rem]">Title :</label>
                    <label className="text-2xl py-[0.8rem]">Description :</label>
                    <label className="text-2xl py-[0.8rem]">Duration :</label>
                    <label className="text-2xl py-[0.8rem]">Age Rating :</label>
                    <label className="text-2xl py-[0.8rem]">Publish Year :</label>
                    <label className="text-2xl py-[0.8rem]">Rating :</label>
                    <label className="text-2xl py-[0.8rem]">Rating Count:</label>
                    <label className="text-2xl py-[0.8rem]">Languages:</label>
                    <label className="text-2xl py-[0.8rem]">Genres:</label>
                    <label className="text-2xl py-[0.8rem]">Casts (IDs):</label>
                    <label className="text-2xl py-[0.8rem]">Poster Upload:</label>
                </div>
                <div className="w-[70%] flex flex-col items-start content-center">
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={movieId}
                        onChange={handleMovieChange}
                        required
                    />
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={description}
                        onChange={handleDescChange}
                        required
                    />
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={duration}
                        onChange={handleDurationChange}
                        required
                    />
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={ageRating}
                        onChange={handleARChange}
                        required
                    />
                    <input
                        type="number"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={pubYear}
                        onChange={handlePYChange}
                        required
                    />
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={rating}
                        onChange={handleRatingChange}
                        required
                    />
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={ratingCount}
                        onChange={handleRatingCChange}
                        required
                    />
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={languages}
                        onChange={handleLangChange}
                        required
                    />
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={genres}
                        onChange={handleGenreChange}
                        required
                    />
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={casts}
                        onChange={handleCastChange}
                        required
                    />
                    <CldUploadButton uploadPreset="cinema-express-movie-poster"
                    className="w-full text-xl p-2 text-black bg-white rounded-full
                    font-semibold hover:text-white hover:bg-black border-2 
                    border-white transition-all duration-150 cursor-pointer"
                    signatureEndpoint={'/api/admin/auth-upload'}>
                        Upload Poster
                    </CldUploadButton>
                </div>
            </div>
            <div className="w-full flex items-center content-center justify-evenly">
                <button className='p-2 bg-white text-black border-white 
                border-2 font-semibold text-xl rounded-full transition-all duration-200 
                mx-2 hover:bg-black hover:text-white'
                onClick={postMovie}>
                    Add Movie
                </button>
            </div>
        </div>
    )
}