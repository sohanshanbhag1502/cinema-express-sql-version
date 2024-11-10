"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import type { MouseEvent, ChangeEvent } from "react";
import { useSnackbar } from "notistack";

function Loginpage() {
    const [userName, setUserName] = useState("")
    const [passwd, setPasswd] = useState("")
    const router=useRouter();
    const {enqueueSnackbar}=useSnackbar();

    const postLogin = async (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res=await fetch('/api/auth/admin/login', {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({adminId:userName, passwd})
        })
        try{
            var message=await res.json();
        }
        catch (e){
            enqueueSnackbar("Something went wrong.", {variant:"error"})
            return
        }
        if (res.status===200){
            router.push('/admin')
        }
        else if (message.error && message.error.length>0){
            enqueueSnackbar("Please check the details entered.", {variant:"error"})
        }
        else if (message.message==='Admin not Registered' || 
            message.message==='Invalid Password'){
            enqueueSnackbar("Either Username or Password is Incorrect.", 
                {variant:"error"})
        }
        else{
            enqueueSnackbar("Sorry unable to reach the server at the moment.", 
                {variant:"error"})
        }
    }

    const handleUserNameChange = (e:ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }
    const handlePasswordChange = (e:ChangeEvent<HTMLInputElement>) => {
        setPasswd(e.target.value)
    }
    return (
        <>
            <h1 className="text-2xl md:text-4xl mb-8 font-semibold text-white">
                Login As Admin
            </h1>
            <form onSubmit={postLogin}>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-[60%] p-3 border border-gray-300 rounded-3xl 
                    bg-transparent text-xl text-center"
                    placeholder="Admin Username"
                    value={userName}
                    onChange={handleUserNameChange}
                    autoFocus
                    required
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-[60%] mt-5 p-3 border border-gray-300 rounded-3xl
                    text-white bg-transparent text-xl text-center"
                    placeholder="Password"
                    value={passwd}
                    onChange={handlePasswordChange}
                    required
                />
                <button className="mt-7 w-[50%] font-semibold text-xl transition
                    text-white p-2 rounded-full bg-blue-800 hover:bg-blue-600"
                    type="submit">
                    Login
                </button>
            </form>
            <div className="flex text-center content-center items-center justify-center 
            w-full pt-8">
                <p className="font-medium text-lg">To become an Administrator contact our 
                support team</p>
            </div>
        </>
    )
}

export default Loginpage
