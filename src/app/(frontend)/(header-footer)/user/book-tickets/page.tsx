"use client"

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TheaterDisplay } from '@/components/Categories';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { HostMovie, Movie, Theater } from '@prisma/client';
import { useSnackbar } from 'notistack';
import { context } from '@/components/Body';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

interface theaterShowTime{
    theaterId:string,
    name:string;
    address:string;
    showtimes:Array<string>;
    movieId: string;
    date:string;
}

interface fetchVal{
    shows: Array<HostMovie>,
    theaters: Array<Theater>
}

export default function BookTicketsPage(){
    const params=useSearchParams();
    const router=useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const setLoading = useContext(context);
    
    const cities=[
        "Bengaluru",
        "Chandigarh",
        "Chennai",
        "Delhi",
        "Hyderabad",
        "Kochi",
        "Mumbai",
        "Pune",
        "Thiruvananthapuram"
    ]
    const [city, setCity]=useState('Bengaluru');
    const curDate=new Date();
    const [date, setDate]=useState(curDate.toDateString());
    const [shows, setShows]=useState<Array<theaterShowTime>>();
    const [movie, setMovie]=useState<Movie>();

    const id=params.get('movieId')

    const fetchMovieTitle=async()=>{
        setLoading(true);
        const res=await fetch('/api/movie-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieId: id
            })
        });
        try{
            var data = await res.json();
        }
        catch(e){
            enqueueSnackbar("Sorry unable to reach the server at the moment.", 
            {variant:"error"});
            setLoading(false);
            return
        }
        if (res.status!==200){
            enqueueSnackbar('Invalid Details Provided', { variant: 'error' });
            router.push('/');
            setLoading(false);
            return;
        }
        setMovie(data.movie);
        setLoading(false);
    }

    const fetchShows = async()=>{
        setLoading(true);
        const res=await fetch('/api/fetch-shows', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieId: id,
                city
            })
        });
        try{
            var data: fetchVal = await res.json();
        }
        
        catch(e){
            enqueueSnackbar("Sorry unable to reach the server at the moment.", 
            {variant:"error"});
            setLoading(false);
            return
        }
        if (res.status!==200){
            enqueueSnackbar("Something Went Wrong.", {variant:"error"});
            router.push('/');
            setLoading(false);
            return;
        }
        const screens: Array<theaterShowTime> = []
        for (var theater of data.theaters){
            screens.push({
                theaterId:theater.theId,
                name:theater.name,
                movieId: id!,
                date,
                address:theater.address,
                showtimes:[]
            })
        }
        for (var show of data.shows){
            const index = screens.findIndex((val)=>val.theaterId==show.theId)
            screens[index].showtimes.push(show.showtime)
        }
        setShows(screens);
        setLoading(false);
    }

    useEffect(()=>{ fetchMovieTitle() }, [])
    useEffect(()=>{ fetchShows() }, [city])

    return (
        <div className="w-full flex flex-col items-start content-center p-10">
            <div className='w-full flex flex-wrap items-center content-center 
            justify-between'>
                <h1 className='text-3xl font-bold'>Book Tickets For {movie?.title}</h1>
                <ul className='flex flex-wrap items-center content-center'>
                    <ThemeProvider theme={darkTheme}>
                        <li>
                            <Select
                                value={city}
                                onChange={(e:SelectChangeEvent<string>)=>
                                    {setCity(e.target.value)}}
                                sx={{
                                    borderRadius:"100px", fontSize:"1.3rem", 
                                    paddingX:"0.5rem", marginX:"1rem", marginY:"0.2rem"
                                }}
                            >
                                {cities.map((ele, ind)=><MenuItem value={ele} key={ind}
                                sx={{fontSize:"1.1rem"}}>{ele}</MenuItem>)}
                            </Select>
                        </li>
                        <li>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    defaultValue={dayjs(date)}
                                    format='DD/MM/YYYY  dddd'
                                    onChange={(e:dayjs.Dayjs|null) => 
                                        setDate(e!.toDate().toDateString())}
                                    sx={{ 
                                        '& .MuiInputBase-input': { fontSize: "1.2rem"},
                                        '& .MuiSvgIcon-root': { fontSize: "2rem"}
                                    }}
                                />
                            </LocalizationProvider>
                        </li>
                    </ThemeProvider>
                </ul>
            </div>
            <div className='w-full flex flex-col items-start content-center py-10'>
                <h1 className='text-2xl font-bold'>Select Theater and Show Time</h1>
                {shows?.map((val)=>
                <TheaterDisplay {...val} key={val.movieId}/>)}
            </div>
        </div>
    )
}