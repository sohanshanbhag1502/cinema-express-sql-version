"use client"

import { BookingCard } from "@/components/Cards";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { useSnackbar } from "notistack";
import { context } from "@/components/Body";

interface BookingDetails{
    bookingId: string,
    movieId: string,
    movieTitle: string,
    movieYear: string,
    date: string,
    showTime: string,
    theater: string,
    address:string;
    city: string
}

export default function MyBookings(){

    const [bookings, setBookings] = useState<Array<BookingDetails>>([]);
    const router = useRouter();
    const {enqueueSnackbar} = useSnackbar();
    const setLoading = useContext(context);

    const fetchAllBookings = async ()=>{
        setLoading(true);
        const res=await fetch('/api/user/bookings/all-bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status===200){
            setBookings(await res.json());
        }
        else{
            enqueueSnackbar("Something went wrong while getting all bookings", 
                {variant: 'error'});
            router.push('/');
        }
        setLoading(false);
    }

    useEffect(()=>{ fetchAllBookings() }, [])

    return (
        <div className="w-full p-10 flex flex-col items-start content-center">
            <h1 className="text-3xl font-bold">My Bookings</h1>
            <div className="w-full p-5 flex flex-col items-center content-center">
                {bookings.map((value)=><BookingCard {...value} key={value.bookingId}/>)}
            </div>
        </div>
    )
}