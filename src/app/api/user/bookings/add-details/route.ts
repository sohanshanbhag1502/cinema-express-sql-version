import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { tokenPayload, verify } from "@/lib/JWT";
import { Payment, Screen } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();

    const { movieId, theaterId, date, time, seats, amount, method } = body;

    const cookie = req.cookies.get('auth-token');
    const token : tokenPayload = await verify(cookie?.value, process.env.JWT_SECRET!);

    if (!amount || !method || !movieId || !theaterId || !date || 
        !time || !seats) {
        return NextResponse.json({message: "Invalid request body"}, {status: 400});
    }

    try{
        const bookingCount = await prisma.booking.count()+1;
        var bookingId = "B"+bookingCount.toString().padStart(4, '0');
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    try{
        var tranId=Math.floor(100000000 + Math.random() * 900000000);

        while ((await prisma.$queryRaw<Payment[]>`
            SELECT * FROM Payment WHERE tranId = ${tranId} LIMIT 1
        `).length > 0){
            tranId=Math.floor(100000000 + Math.random() * 900000000);
        }

        var screen: Screen[] = await prisma.$queryRaw`
            SELECT screenId FROM HostMovie WHERE theId = ${theaterId} AND 
            movieId = ${movieId} LIMIT 1
        `;

    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    if (screen.length === 0){
        return NextResponse.json({message: "Screen Not Found"}, {status: 400});
    }

    if (!token || !token.userId){
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const screenId = screen[0].screenId;

    try{
        const seatsList = seats.reduce((acc:string, ele:string) => acc + ele + 
        ", ", "").slice(0, -2);

        await prisma.$executeRaw`
            INSERT INTO Booking (
                bookId, movieId, theId, screenId, userId, showtime, bookdate, seats
            ) 
            VALUES (
                ${bookingId}, ${movieId}, ${theaterId}, ${screenId}, ${token.userId}, 
                ${time.trim()}, ${date.trim()}, ${seatsList}
            )
        `;

        seats.map(async (ele: string) => {
            const [seatRow, seatCol] = ele.split('-');
            await prisma.$executeRaw`
                INSERT INTO BookedSeat (
                    seatRow, seatCol, theId, movieId, bookId, screenId, bookingTime, bookingDate
                ) 
                VALUES (
                    ${seatRow}, ${seatCol}, ${theaterId}, ${movieId}, ${bookingId}, 
                    ${screenId}, ${time.trim()}, ${date.trim()}
                )
            `;
        });

        await prisma.$executeRaw`
            INSERT INTO Payment (
                amount, method, tranId, bookId
            ) VALUES (
                ${amount}, ${method}, ${tranId}, ${bookingId}
            )
        `;

    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json({bookingId}, {status: 200});
}