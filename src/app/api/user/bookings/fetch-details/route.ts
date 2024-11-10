import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Booking, Movie, Payment, Theater } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();

    const { bookingId } = body;

    if (!bookingId) {
        return NextResponse.json({message: "Invalid request body"}, {status: 400});
    }

    try{
        var [booking, payment] = await Promise.all([
            prisma.$queryRaw<Booking[]>`
              SELECT * FROM Booking WHERE bookId = ${bookingId} LIMIT 1
            `,
            prisma.$queryRaw<Payment[]>`
              SELECT * FROM Payment WHERE bookId = ${bookingId} LIMIT 1
            `
        ]);

        if (booking.length === 0 || payment.length === 0){
            return NextResponse.json({message: "Booking not found"}, {status: 404});
        }
        
        var theater: Theater[] = await prisma.$queryRaw`
            SELECT * FROM Theater WHERE theId = ${booking[0].theId} LIMIT 1
        `;
        var movie: Movie[] = await prisma.$queryRaw`
            SELECT * FROM Movie WHERE movieId = ${booking[0].movieId} LIMIT 1
        `;
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json({
        theater: theater[0].name,
        movieTitle:movie[0].title, 
        date: booking[0].bookdate, 
        time: booking[0].showtime, 
        seats: booking[0].seats, 
        amount: payment[0].amount
    }, {status: 200});
}