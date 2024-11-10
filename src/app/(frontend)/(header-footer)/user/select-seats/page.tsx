"use client"

import { useSearchParams } from "next/navigation";
import { SeatLayout } from "@/components/SeatLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { useSnackbar } from "notistack";
import { context } from "@/components/Body";

export default function SelectSeats(){
    const params=useSearchParams();
    const router=useRouter();
    const {enqueueSnackbar}=useSnackbar();

    const movieId=params.get('movieId');
    const theaterId=params.get('theaterId');
    const time=params.get('time');
    const date=params.get('date');
    const [theater, setTheater] = useState("");
    const [movie, setMovie] = useState("");
    const [bookedList, setBookedList] = useState<Array<string>>([]);

    const setLoading=useContext(context);

    const fetchDetails = async()=>{
        setLoading(true);
        const res=await fetch('/api/movie-theater-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieId,
                theaterId
            })
        });
        if (res.status!==200){
            enqueueSnackbar('Invalid Details Provided', {variant: 'error'});
            router.push('/');
            return;
        }
        try{
            var data = await res.json();
        }
        catch (e){
            enqueueSnackbar("Sorry unable to reach the server at the moment.", 
            {variant:"error"});
            setLoading(false);
            return
        }
        setTheater(data.theater.name+", "+data.theater.address+", "+data.theater.city);
        setMovie(data.movie.title);
        setLoading(false);
    }

    const fetchBookedSeats = async()=>{
        setLoading(true);
        const res=await fetch('/api/user/bookings/booked-seats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieId,
                theaterId,
                time:time?.trim(),
                date:date?.trim()
            })
        });
        if (res.status!==200){
            enqueueSnackbar('Invalid Details Provided', {variant: 'error'});
            router.push('/');
            setLoading(false);
            return;
        }
        try{
            var data : string[] = await res.json();
        }
        catch (e){
            enqueueSnackbar("Sorry unable to reach the server at the moment.", 
            {variant:"error"});
            setLoading(false);
            return
        }
        setBookedList(data);
        setLoading(false);
    }

    useEffect(()=>{
        localStorage.clear();
        fetchDetails();
        fetchBookedSeats();
    },[]);

    return (
        <div className="w-full p-10 flex flex-col content-center items-start">
            <h1 className="text-3xl font-bold">Select Seats for {movie}</h1>
            <div className="w-full flex flex-col items-start content-center mt-4">
                <h1 className="text-xl font-semibold">Booking Details</h1>
                <p className="text-md font-medium">Theater: {theater}</p>
                <p className="text-md font-medium">Show Time: {time}</p>
                <p className="text-md font-medium">Date: {date}</p>
            </div>
            <SeatLayout bookedList={bookedList}/>
            <div className="w-full flex items-center content-center justify-center">
                <Link className='p-3 bg-white text-black rounded-full
                    border-2 font-semibold text-lg transition-all duration-200
                    hover:bg-black hover:text-white'
                    href={{
                        pathname:"/user/payment", 
                        query:{ movieId, theaterId, time, date }
                    }}>
                    Proceed With Payment
                </Link>
            </div>
        </div>
    )
}