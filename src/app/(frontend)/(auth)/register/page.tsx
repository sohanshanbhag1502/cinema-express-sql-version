"use client"

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { ChangeEvent, FormEventHandler, MouseEvent } from "react";
import { useSnackbar } from "notistack";

function SignupPage() {
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

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
        setDob(e.target.value)
    }

    const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value)
    }

    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleRePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRePassword(e.target.value)
    }

    const postRegister = async (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== repassword) {
            enqueueSnackbar("The password and re-enter password must match.",
                { variant: "error" });
            return
        }
        const res=await fetch('/api/auth/user/register', {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                userId:userName, 
                passwd:password, 
                email, 
                phNum:phoneNo, 
                dob, 
                gender, 
                name
            })
        })
        try{
            var message=await res.json();
        }
        catch(e){
            enqueueSnackbar("Sorry unable to reach the server at the moment.", 
            {variant:"error"});
            return
        }
        if (res.status===200){
            enqueueSnackbar("User registered successfully.", {variant:"success"});
            router.push('/login')
        }
        else if (message.error && message.error.length>0){
            enqueueSnackbar("Please check the details entered.", {variant:"error"});
        }
        else if (message.message==='User already exists'){
            enqueueSnackbar("Username already exists.", {variant:"error"});
        }
        else{
            enqueueSnackbar("Sorry unable to reach the server at the moment.",
            {variant:"error"});
        }
    }

    return (
        <>
            <h1 className="text-2xl md:text-4xl pt-5 font-semibold text-center">
                Welcome to Cinema Express
            </h1>
            <h1 className="pb-5 text-xl font-semibold text-center">
                Enter your details to get started
            </h1>
            <form onSubmit={postRegister}>
                <div className="w-full flex flex-col md:flex-row md:justify-between pt-1">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="m-1 p-3 border border-gray-300 rounded-3xl 
                        text-white w-full bg-transparent text-xl text-center"
                        placeholder="Name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="m-1 p-3 border border-gray-300 rounded-3xl 
                        text-white w-full bg-transparent text-xl text-center"
                        placeholder="Username"
                        value={userName}
                        onChange={handleUserNameChange}
                        required
                    />
                </div>
                <div className="w-full flex flex-col md:flex-row md:justify-between pt-1">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="m-1 p-3 border border-gray-300 rounded-3xl 
                        text-white w-full bg-transparent text-xl text-center"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        type="text"
                        id="phoneNo"
                        name="phoneNo"
                        className="m-1 p-3 border border-gray-300 rounded-3xl 
                        text-white w-full bg-transparent text-xl text-center"
                        placeholder="Phone Number"
                        value={phoneNo}
                        onChange={handlePhoneNoChange}
                        required
                    />
                </div>
                
                <div className="w-full flex flex-col md:flex-row md:justify-between pt-1">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="m-1 p-3 border border-gray-300 rounded-3xl 
                        text-white w-full bg-transparent text-xl text-center"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <input
                        type="password"
                        id="repassword"
                        name="repassword"
                        className="m-1 p-3 border border-gray-300 rounded-3xl 
                        text-white w-full bg-transparent text-xl text-center"
                        placeholder="Re-enter Password"
                        value={repassword}
                        min={0}
                        onChange={handleRePasswordChange}
                        required
                    />
                </div>
                <div className="w-full flex flex-col md:flex-row md:justify-between pt-1
                content-center items-center">
                    <label className="text-xl w-[30%]">Date of Birth:</label>
                    <input
                        type="date"
                        id="DOB"
                        name="DOB"
                        className="m-1 p-3 w-[70%] border border-gray-300 rounded-3xl 
                        text-white bg-transparent text-xl text-center cursor-pointer"
                        placeholder="Date of Birth"
                        value={dob}
                        onChange={handleDobChange}
                        required
                    />
                </div>
                <div className="w-full flex content-center items-center justify-center">
                    <label className="text-xl p-2">Gender:</label>
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="Male"
                        onChange={handleGenderChange}
                        className="mr-2 cursor-pointer"
                        required
                    />
                    <label
                        htmlFor="male"
                        className="text-xl font-medium text-white"
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
                    />
                    <label
                        htmlFor="female"
                        className="text-xl font-medium text-white"
                    >
                        Female
                    </label>
                </div>
                <button
                type="submit"
                className="mt-4 w-[40%] font-semibold text-white 
                p-2 rounded-full bg-blue-800 hover:bg-blue-600 text-xl">
                    Sign Up
                </button>
            </form>
            <div className="flex items-center content-center text-center 
            justify-center mt-4">
                <p className="font-medium text-lg">Already have an account?&nbsp;</p>
                <Link href="/login" className="text-blue-400 hover:underline 
                font-medium text-lg cursor-pointer">
                    Login
                </Link>
            </div>
        </>
    )
}

export default SignupPage
