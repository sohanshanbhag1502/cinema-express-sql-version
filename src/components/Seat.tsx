"use client"

import { useState } from "react";

interface SeatProps{
    SeatNo:number;
    booked:boolean;
    seatRow:string;
}

export default function Seat(props: SeatProps){
    const [booked, setBooked] = useState(props.booked);
    return (
        <button className={'w-11 border-2 font-semibold text-2xl \
        transition-all duration-200 mx-2 '+
        (()=>{
            if (props.booked) 
                return 'bg-black text-white cursor-default border-white';
            else if (booked){
                return 'bg-black text-green-600 border-green-600';
            }
            else 
                return 'bg-white text-black hover:bg-black hover:text-white';
        })()}
        disabled={props.booked} onClick={()=>{
            setBooked(!booked);
            const seats = localStorage.getItem('seats');
            if (seats){
                var seatList: Array<string> = JSON.parse(seats);
                seatList.push(props.seatRow+'-'+props.SeatNo);
                localStorage.setItem('seats', JSON.stringify(seatList));
            }
            else{
                localStorage.setItem('seats', JSON.stringify(
                    [props.seatRow+'-'+props.SeatNo]));
            }
        }}>
            {props.SeatNo}
        </button>
    )
}