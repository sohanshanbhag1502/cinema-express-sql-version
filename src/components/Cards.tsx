"use client"

import Link from "next/link";
import type {ParsedUrlQueryInput} from "querystring";
import { CldImage } from "next-cloudinary";
import { useSearchParams, useRouter } from "next/navigation";

interface CardProps {
    key: string;
    title: string;
    category: string;
    image: string;
}

interface StarProps{
    key:string;
    id:string;
    name: string;
    designation: string;
    biolink: string;
}

export interface MovieProps {
    key:string;
    movieId: string;
    title: string;
    pubYear: number;
    ageRating: string;
    duration: string;
    genres: string[];
}

interface FilterProps{
    type: string;
    value: string;
}

interface ShowTimeProps{
    key:string;
    movieId: string;
    theaterId: string;
    date:string;
    time: string;
}

interface BookingProps{
    key:string;
    bookingId: string;
    movieId: string;
    movieTitle: string;
    movieYear: string;
    date: string;
    showTime: string;
    theater: string;
    address:string;
    city: string;
}

export function Card(props: CardProps){
    var queryObj : ParsedUrlQueryInput = {};
    queryObj[props.category] = props.title.replace("+", "plus");
    return (
        <Link className="w-[12vw] border-white border-2 flex flex-col content-center 
        justify-start items-center p-4 transition-all duration-150 cursor-pointer
        hover:scale-110 hover:shadow-lg hover:shadow-teal-600" key={props.title}
        href={{
            pathname:"/search",
            query:queryObj
        }}>
            <h1 className="text-xl font-medium">{props.title}</h1>
            <img alt={props.title} className="h-full object-contain"
            src={'/'+props.image+'.png'} />
        </Link>
    )
}

export function StarCard(props: StarProps){
    return (
        <Link href={props.biolink} className="w-[12%] mr-[5rem] cursor-pointer" 
        target="_blank" key={props.id}>
            <div className="w-full flex flex-col items-center content-center 
            justify-center text-center">
                <CldImage alt={props.name} src={props.id!+'.avif'}
                height={400} width={250} className='border-[0.25px] 
                border-white rounded-full'/>
                <p className="pt-4 font-medium text-md">{props.name}</p>
                <p className="font-medium text-sm text-gray-400">
                    {props.designation}
                </p>
            </div>
        </Link>
    )
}

export function MovieCard(props:MovieProps){
    return (
        <Link className="xl:w-[15vw] xs:w-full md:w-[40%] border-white border-2 flex flex-col content-center 
        justify-start items-start p-4 transition-all duration-150 cursor-pointer
        hover:scale-105 hover:shadow-lg hover:shadow-teal-600 relative my-3" 
        key={props.movieId}
        href={{
            pathname:"/movie",
            query:{
                movieId:props.movieId
            }
        }}>
            <p className="text-sm font-medium absolute left-[1.1rem] bg-pink-600 
            bg-opacity-60 top-[1.1rem] p-[1px]">
                {props.ageRating.replace("+", "")}+
            </p>
            <p className="text-md font-medium absolute left-[1.1rem] bg-pink-600 
            bg-opacity-60 top-[15rem] p-[1px]">
                {props.pubYear}
            </p>
            <CldImage alt={props.title} src={props.movieId!+'.avif'}
            height={500} width={300} className='border-[0.25px] 
            border-white'/>
            <h1 className="text-2xl font-medium mt-2">{props.title}</h1>
            <p className="text-lg font-medium mt-2">2D, 3D, 4D</p>
            <p className="text-lg font-medium mt-2">{props.genres.join(", ")}</p>
            <h1 className="text-sm font-medium mt-2">Languages Available:&nbsp;
                Multiple</h1>
        </Link>
    )
}

export function FilterCard(props: FilterProps){
    const params = useSearchParams();
    const router = useRouter();
    return (
        <div className="m-1 p-1 bg-blue-700 flex items-center content-center
        justify-evenly rounded-full">
            <p className="px-2">
                {props.type.charAt(0).toUpperCase()+props.type.slice(1)}&nbsp;:&nbsp;
                {props.value.replace("plus", "+")}
            </p>
            <button className="px-2 text-gray-400 font-semibold"
            onClick={()=>{
                const newQuery: Record<string, string> = {};
                for(let entry of params.entries()) {
                    if(entry[0]!==props.type){
                        newQuery[entry[0]] = entry[1];
                    }
                }
                router.push(`/search?${new URLSearchParams(newQuery).toString()}`);
            }}>
                X
            </button>
        </div>
    )
}

export function ShowTimeCard(props: ShowTimeProps){
    return(
        <Link className="m-2 px-2 py-1 rounded-full hover:text-black 
        hover:bg-white border-2 border-white transition-all duration-200 font-medium"
        href={{
                pathname:"/user/select-seats", 
                query:{
                    ...props
                }
            }}>
            {props.time}
        </Link>
    )
}

export function BookingCard(props: BookingProps){
    return (
        <Link className="w-full flex flex-col items-start content-center border-2 
        border-white p-4 my-4 cursor-pointer transition-all duration-200 
        hover:scale-105 hover:shadow-md hover:shadow-teal-400"
        href={{
            pathname:"/booking-confirmation",
            query:{
                bookingId:props.bookingId
            }
        }}>
            <p className="text-2xl">Booking Id: {props.bookingId}</p>
            <div className="w-full flex items-center content-center py-2">
                <CldImage alt={props.movieTitle} src={props.movieId!+'.avif'}
                height={100} width={50} className='border-[0.25px] 
                border-white rounded-xl'/>
                <div className="w-full flex flex-col items-start content-center px-5">
                    <p className="text-lg">{props.movieTitle} - {props.movieYear}</p>
                    <p className="text-lg">{props.date} @ {props.showTime}</p>
                    <p className="text-lg">{props.theater}, {props.address}, {props.city}</p>
                </div>
            </div>
        </Link>
    )
}