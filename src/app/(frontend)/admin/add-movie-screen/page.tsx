"use client"

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useSnackbar } from "notistack";

export default function AddScreenPage(){
    const { enqueueSnackbar } = useSnackbar();

    const [screenId, setScreenId] = useState("");
    const [theId, setTheId] = useState("");
    const [movieId, setMovieId] = useState("");
    const [cost, setCost] = useState(0);
    const [showtime, setShowtime] = useState("");

    const handleScreenChange = (e: ChangeEvent<HTMLInputElement>) => {
        setScreenId(e.target.value)
    }

    const handleTheaterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTheId(e.target.value)
    }

    const handleMovieChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMovieId(e.target.value)
    }

    const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCost(parseInt(e.target.value))
    }

    const handleShowtimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setShowtime(e.target.value)
    }

    const postMovieScreen = async (e: FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const res=await fetch('/api/admin/add-items/movie-screen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                screenId,
                theId,
                movieId,
                cost,
                showtime
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
            enqueueSnackbar("Added the movie to the screen successfully", 
                {variant: 'success'});
        }
        else if (message.error && message.error.length>0){
            enqueueSnackbar("Please check the details entered.", {variant: 'error'});
        }
        else{
            enqueueSnackbar("Something went wrong", {variant: 'error'});
        }
    }

    return (
        <div className="w-full flex flex-col items-center content-center justify-center 
        p-10">
            <h1 className="font-bold text-4xl">Add Movie to the Screen</h1>
            <div className="w-[50%] flex py-5 items-center content-center">
                <div className="w-[40%] flex flex-col items-start content-center">
                    <label className="text-2xl py-[0.8rem]">Screen ID :</label>
                    <label className="text-2xl py-[0.8rem]">Theater ID :</label>
                    <label className="text-2xl py-[0.8rem]">Movie ID :</label>
                    <label className="text-2xl py-[0.8rem]">Cost :</label>
                    <label className="text-2xl py-[0.8rem]">Showtime (HH:MM)
                        <br/>(24-hour format) :</label>
                </div>
                <div className="w-[60%] flex flex-col items-start content-center">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={screenId}
                        onChange={handleScreenChange}
                        required
                    />
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={theId}
                        onChange={handleTheaterChange}
                        required
                    />
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={movieId}
                        onChange={handleMovieChange}
                        required
                    />
                    <input
                        type="number"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={cost}
                        onChange={handleCostChange}
                        required
                    />
                    <input
                        type="text"
                        className="mt-[2.4rem] mb-[0.7rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={showtime}
                        onChange={handleShowtimeChange}
                        required
                    />
                </div>
            </div>
            <div className="w-full flex items-center content-center justify-evenly">
                <button className='p-2 bg-white text-black border-white 
                border-2 font-semibold text-xl rounded-full transition-all duration-200 
                mx-2 hover:bg-black hover:text-white'
                onClick={postMovieScreen}>
                    Add Movie to the Screen
                </button>
            </div>
        </div>
    )
}