"use client"

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useSnackbar } from "notistack";

export default function AddTheaterPage(){
    const {enqueueSnackbar} = useSnackbar();

    const [theId, setTheId] = useState("")
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")

    const handleTheChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTheId(e.target.value)
    }

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value)
    }

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value)
    }

    const postTheater = async (e: FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const res=await fetch('/api/admin/add-items/theater', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                theId,
                name,
                city,
                address
            })
        });
        try{
            var message = await res.json();
        }
        catch (e){
            enqueueSnackbar("Sorry unable to reach the server at the moment.", 
            {variant:"error"});
            return
        }
        if (res.status===200){
            enqueueSnackbar("Added the theater successfully", {variant: "success"});
        }
        else if (message.error && message.error.length>0){
            enqueueSnackbar("Please check the details entered.", {variant: "error"});
        }
        else{
            enqueueSnackbar("Some error occurred. Please try again later.",
                {variant: "error"});
        }
    }

    return (
        <div className="w-full flex flex-col items-center content-center justify-center 
        p-10">
            <h1 className="font-bold text-4xl">Add Theater</h1>
            <div className="w-[50%] flex py-5 items-center content-center">
                <div className="w-[30%] flex flex-col items-start content-center">
                    <label className="text-2xl py-[0.8rem]">Theater ID :</label>
                    <label className="text-2xl py-[0.8rem]">Theater Name :</label>
                    <label className="text-2xl py-[0.8rem]">City :</label>
                    <label className="text-2xl py-[0.8rem]">Address :</label>
                </div>
                <div className="w-[70%] flex flex-col items-start content-center">
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={theId}
                        onChange={handleTheChange}
                        required
                    />
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={city}
                        onChange={handleCityChange}
                        required
                    />
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={address}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
            </div>
            <div className="w-full flex items-center content-center justify-evenly">
                <button className='p-2 bg-white text-black border-white 
                border-2 font-semibold text-xl rounded-full transition-all duration-200 
                mx-2 hover:bg-black hover:text-white'
                onClick={postTheater}>
                    Add Theater
                </button>
            </div>
        </div>
    )
}