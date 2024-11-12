"use client"

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useSnackbar } from "notistack";

export default function AddTheaterPage(){
    const {enqueueSnackbar} = useSnackbar();

    const [movieId, setMovieId] = useState("");
    const [movieName, setMovieName] = useState("");
    const [bookings, setBookings] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const handleMovieChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMovieId(e.target.value)
    }

    const postTheater = async (e: FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const res=await fetch('/api/admin/fetch-collection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieId
            })
        });
        try{
            var message: {
                title: string,
                totalBookings: number,
                totalAmountCollected: number
            } = await res.json();
        }
        catch (e){
            enqueueSnackbar("Sorry unable to reach the server at the moment.", 
            {variant:"error"});
            return
        }
        if (res.status===200){
            setMovieName(message.title);
            setBookings(message.totalBookings);
            setTotalAmount(message.totalAmountCollected);
        }
        else{
            enqueueSnackbar("Some error occurred. Please try again later.",
                {variant: "error"});
        }
    }

    return (
        <div className="w-full flex flex-col items-center content-center justify-center 
        p-10">
            <h1 className="font-bold text-4xl">Add Theater</h1>
            <div className="w-[50%] flex py-5 items-center content-center">
                <div className="w-[30%] flex flex-col items-start content-center">
                    <label className="text-2xl py-[0.8rem]">Movie ID :</label>
                    <label className="text-2xl py-[0.8rem]">Movie Name :</label>
                    <label className="text-2xl py-[0.8rem]">Number of Bookings :</label>
                    <label className="text-2xl py-[0.8rem]">Total Amount :</label>
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
                        value={movieName}
                        disabled
                        required
                    />
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={bookings}
                        disabled
                        required
                    />
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={totalAmount}
                        disabled
                        required
                    />
                </div>
            </div>
            <div className="w-full flex items-center content-center justify-evenly">
                <button className='p-2 bg-white text-black border-white 
                border-2 font-semibold text-xl rounded-full transition-all duration-200 
                mx-2 hover:bg-black hover:text-white'
                onClick={postTheater}>
                    Calculate Revenue Collection
                </button>
            </div>
        </div>
    )
}