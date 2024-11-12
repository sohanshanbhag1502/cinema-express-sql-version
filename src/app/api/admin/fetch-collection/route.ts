import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {movieId} = body;
    
    try{
        var result: {
            title: string,
            totalBookings: number,
            totalAmountCollected: number
        }[] = await prisma.$queryRaw`
            SELECT
                m.title,
                COUNT(b.bookId) AS totalBookings,
                SUM(p.amount) AS totalAmountCollected
            FROM 
                booking b
            JOIN 
                payment p ON b.bookId = p.bookId
            JOIN
                movie m ON b.movieId = m.movieId
            WHERE 
                b.movieId = ${movieId}
            GROUP BY m.movieId
        `;
        if (result.length === 0) {
            return NextResponse.json({message: "No Tickets are booked for the movie"}, {status: 404});
        }
        result = result.map((row) => ({
            title: row.title,
            totalBookings: Number(row.totalBookings),
            totalAmountCollected: Number(row.totalAmountCollected)
        }));
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json(result[0], {status: 200});
}