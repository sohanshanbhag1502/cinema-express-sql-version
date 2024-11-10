"use client"
import React, {useEffect, useState, useContext} from "react"
import { BiDownArrow } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import { context } from "@/components/Body";

export default function DropDown({userName, setLoggedIn}: 
    Readonly<{userName: string, setLoggedIn: React.Dispatch<React.SetStateAction<
        boolean>> | null}>){
    const [drop, setDrop] = useState(false)
    const router = useRouter();
    const setLoading = useContext(context);

    const logOut = async () => {
        setLoading(true);
        const res = await fetch(`/api/auth/logout`, {
            method: "POST"
        });
        if (res.status === 200){
            if (setLoggedIn){
                setLoggedIn(false);
                router.push('/');
            }
            else{
                router.push('/admin/login');
            }
        }
        setLoading(false);
    }

    useEffect(()=>{
        window.addEventListener('click', function(e: MouseEvent){
            const target = e.target as HTMLElement
            if (target.id !== "dropButton" && target.id !== "logout"){
                setDrop(false)
            }
        })
    }, [])

    return(
        <>
            <div className="w-[30%] rounded-3xl text-xl hover:text-blue-700 flex 
            items-center justify-evenly content-center cursor-pointer" id="dropButton"
            onClick={()=>{setDrop(!drop)}}>
                <VscAccount size={40}/>{userName}
                <BiDownArrow size={15}/>
            </div>
            {drop && (
                <div className="right-2 rounded-xl border 
                border-black absolute top-[5.7rem] pop-up-animation shadow-lg
                z-10" id="dropdown">
                    <ul className="w-full">
                        <li className="px-4 py-2 text-lg cursor-pointer bg-gray-950
                        hover:bg-gray-800" onClick={()=>{router.push('/user/profile')}}>
                            My Profile
                        </li>
                        <li className="px-4 py-2 text-lg cursor-pointer bg-gray-950
                        hover:bg-gray-800" onClick={()=>{router.push('/user/my-bookings')}}>
                            My Bookings
                        </li>
                        <li className="px-4 py-2 text-lg cursor-pointer bg-gray-950
                        hover:bg-gray-800" onClick={logOut}>
                            Log Out
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
}