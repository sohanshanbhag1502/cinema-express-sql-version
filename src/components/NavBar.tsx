"use client"

import Link from "next/link";
import { ChangeEvent, KeyboardEvent, useEffect, useState, useContext } from "react";
import DropDown from "@/components/DropDown";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { context } from "@/components/Body";

export function NavBar(){
    const [loggedIn, setLoggedIn] = useState(false);
    const [id, setId] = useState("");
    const [search, setSearch] = useState("");
    const router = useRouter();
    const {enqueueSnackbar} = useSnackbar();
    const setLoading = useContext(context);

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=> {setSearch(e.target.value)}
    const handleEnter = (e:KeyboardEvent<HTMLInputElement>)=>{
        if (e.key === "Enter"){
            router.push(`/search?movieTitle=${search}`)
        }
    }

    const checkLoggedIn = async () => {
        setLoading(true);
        const res = await fetch('/api/auth/loggedIn', {
            method: "POST"
        });
        try{
            var {id} = await res.json();
        }
        catch (e){
            enqueueSnackbar("Sorry unable to reach the server at the moment.", 
            {variant:"error"});
            setLoading(false);
            return
        }
        if (res.status === 200){
            enqueueSnackbar(`Logged in as ${id} successfully.`, {variant:"success"});
            setId(id);
            setLoggedIn(true);
        }
        else{
            setLoggedIn(false);
        }
        setLoading(false);
    }

    useEffect(() => { checkLoggedIn() }, []);

    return (
        <nav className="w-full flex content-center items-center justify-between 
        shadow-sm shadow-white">
            <Link href="/" className="p-4 w-[10%]">
                <img src="/logo.png" className="w-full"/>
            </Link>
            <input className="text-xl rounded-full border-white border-2 bg-black p-2
            w-[40%] focus:border-2" id="searchfield"
            placeholder="Search for movies here..." 
            value={search} onChange={handleChange} onKeyDown={handleEnter}/>
            <div className="flex content-center items-center justify-between px-[1%]
            w-[40%]">
                <Link href="/" className="text-xl font-semibold cursor-pointer
                group transition duration-300" id="homelink">
                    Home
                    <span className="block max-w-0 group-hover:max-w-full transition-all 
                    duration-[450ms] h-1 rounded-full bg-indigo-700"></span>
                </Link>
                <Link href="/about" className="text-xl font-semibold cursor-pointer
                group transition duration-300" id="aboutlink">
                    About
                    <span className="block max-w-0 group-hover:max-w-full transition-all 
                    duration-[450ms] h-1 rounded-full bg-indigo-700"></span>
                </Link>
                <Link href="/contactus" className="text-xl font-semibold cursor-pointer
                group transition duration-300" id="contactlink">
                    Contact Us
                    <span className="block max-w-0 group-hover:max-w-full transition-all 
                    duration-[450ms] h-1 rounded-full bg-indigo-700"></span>
                </Link>
                {loggedIn?
                <DropDown userName={id} setLoggedIn={setLoggedIn}/>
                :
                <Link href="/login" className="text-xl font-semibold cursor-pointer
                rounded-full bg-white text-black py-1 px-5 hover:bg-black 
                hover:text-white transition-all duration-150 border-white border-2">
                    Login/Register
                </Link>
                }
            </div>
        </nav>
    )
}

export function AdminNavBar(){
    const [id, setId] = useState("");
    const {enqueueSnackbar} = useSnackbar();
    const setLoading = useContext(context);

    const checkLoggedIn = async () => {
        setLoading(true);
        const res = await fetch('/api/auth/loggedIn', {
            method: "POST"
        });
        try{
            var {id} = await res.json();
        }
        catch (e){
            enqueueSnackbar("Sorry unable to reach the server at the moment.", 
            {variant:"error"});
            return
        }
        if (res.status === 200){
            enqueueSnackbar(`Logged in as ${id} (Admin) successfully.`, 
                {variant:"success"});
            setId(id);
        }
        setLoading(false);
    }
    useEffect(() => { checkLoggedIn() }, []);

    return (
        <nav className="w-full flex content-center items-center justify-between 
        shadow-sm shadow-white">
            <div className="w-[10%] flex items-center content-center p-4">
                <img src="/logo.png" className="w-full mr-4"/>
                <p className="text-3xl font-bold">Admins</p>
            </div>
            <p className="text-3xl w-[200%] text-center ml-7">
                Admin Dashboard
            </p>
            <DropDown userName={id} setLoggedIn={null}/>
        </nav>
    )
}