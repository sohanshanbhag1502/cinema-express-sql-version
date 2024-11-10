import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();

    const { movieId, date, time, theaterId } = body;

    if (!movieId || !theaterId || !date || !time){ 
        return NextResponse.json({message: "Invalid request body"}, {status: 400});
    }

    try{
        var bookedSeats: any[] = await prisma.$queryRaw`
            SELECT CONCAT(seatRow, '-', seatCol) AS seat
            FROM BookedSeat
            WHERE movieId = ${movieId}
                AND bookingDate = ${date.trim()}
                AND bookingTime = ${time.trim()}
                AND theId = ${theaterId}
        `;
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json(bookedSeats.map((val)=>val.seat), {status: 200});
}