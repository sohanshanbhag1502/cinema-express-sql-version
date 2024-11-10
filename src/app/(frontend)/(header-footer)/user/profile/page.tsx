"use client"

import { useEffect, useState, useContext } from "react";
import type { MouseEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { context } from "@/components/Body";

export default function ProfilePage(){
    const { enqueueSnackbar } = useSnackbar();
    const setLoading = useContext(context);

    const [name, setName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDob] = useState(new Date())
    const [gender, setGender] = useState("")
    const [userName, setUserName] = useState("")

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handlePhoneNoChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhoneNo(e.target.value)
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleDobChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDob(new Date(e.target.value))
    }

    const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value)
    }

    const postProfile = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setLoading(true);
        const res=await fetch('/api/auth/user/update-profile', {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                userId:userName, 
                name,
                phNum:phoneNo,
                email,
                dob,
                gender
            })
        })
        if (res.status===200){
            enqueueSnackbar("Profile Updated Successfully.", {variant:"success"})
        }
        else{
            enqueueSnackbar("Something went wrong. Please try again.", 
                {variant:"error"})
        }
        setLoading(false);
    }

    const fetchProfile = async () => {
        setLoading(true);
        const res=await fetch('/api/auth/user/fetch-profile', {
            method:"POST",
            headers:{"Content-Type":"application/json"}
        })
        try{
            var data=await res.json();
        }
        catch (e){
            enqueueSnackbar("Unable to reach the server.", {variant:"error"})
            setLoading(false);
            return;
        }
        if (res.status===200){
            setUserName(data.userId)
            setName(data.name)
            setPhoneNo(data.phNum)
            setEmail(data.email)
            setDob(new Date(data.dob))
            setGender(data.gender)
        }
        else{
            enqueueSnackbar("Unable to retrive the profile.", {variant:"error"})
        }
        setLoading(false);
    }

    useEffect(() => {fetchProfile()}, [])

    return (
        <div className="w-full flex flex-col items-center content-center justify-center 
        p-10">
            <h1 className="font-bold text-4xl">My Profile</h1>
            <div className="w-[50%] flex py-10 items-center content-center">
                <div className="w-[25%] flex flex-col items-start content-center">
                    <label className="text-2xl py-[0.83rem]">Name:</label>
                    <label className="text-2xl py-[0.83rem]">Username:</label>
                    <label className="text-2xl py-[0.83rem]">Email:</label>
                    <label className="text-2xl py-[0.83rem]">Phone No:</label>
                    <label className="text-2xl py-[0.83rem]">DOB:</label>
                    <label className="text-2xl py-[0.83rem]">Gender:</label>
                </div>
                <div className="w-[75%] flex flex-col items-start content-center">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={userName}
                        required
                        disabled
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        type="phoneNo"
                        id="phoneNo"
                        name="phoneNo"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={phoneNo}
                        onChange={handlePhoneNoChange}
                        required
                    />
                    <input
                        type="date"
                        id="DOB"
                        name="DOB"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg
                        text-white w-full bg-transparent text-xl text-start"
                        value={dob.toISOString().split('T')[0]}
                        onChange={handleDobChange}
                        required
                    />
                    <div className="w-full flex items-center content-center justify-start
                    my-[0.63rem]">
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="Male"
                            onChange={handleGenderChange}
                            className="mr-2 cursor-pointer"
                            required
                            checked={gender=="Male"}
                        />
                        <label
                            htmlFor="male"
                            className="text-2xl font-medium text-white"
                        >
                            Male
                        </label>
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="Female"
                            onChange={handleGenderChange}
                            className="ml-4 mr-2 cursor-pointer"
                            required
                            checked={gender=="Female"}
                        />
                        <label
                            htmlFor="female"
                            className="text-2xl font-medium text-white"
                        >
                            Female
                        </label>
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center content-center justify-evenly">
                <button className='p-2 mt-6 bg-white text-black border-white border-2
                font-semibold text-xl rounded-full transition-all duration-200 mx-2
                hover:bg-black hover:text-white' onClick={postProfile}>
                    Update My Profile
                </button>
                <Link className='p-2 mt-6 bg-white text-black border-white border-2
                font-semibold text-xl rounded-full transition-all duration-200 mx-2
                hover:bg-black hover:text-white' href='/user/my-bookings'>
                    Go to My Bookings
                </Link>
            </div>
        </div>
    )
}