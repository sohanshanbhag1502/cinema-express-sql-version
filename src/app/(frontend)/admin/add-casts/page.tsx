"use client"

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { CldUploadButton } from 'next-cloudinary';
import { useSnackbar } from "notistack";

export default function AddCastPage(){
    const [castId, setCastId] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [biolink, setBiolink] = useState("");

    const { enqueueSnackbar } = useSnackbar();

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleCastIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCastId(e.target.value)
    }

    const handleRoleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRole(e.target.value)
    }

    const handleBiolinkChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBiolink(e.target.value)
    }

    const postCast = async (e: FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const res=await fetch('/api/admin/add-items/cast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                castId,
                name,
                role,
                biolink
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
            enqueueSnackbar("Added the cast successfully", {variant: 'success'});
        }
        else if (message.error && message.error.length>0){
            enqueueSnackbar("Please check the details entered.", {variant: 'error'});
        }
        else{
            enqueueSnackbar("Something went wrong", {variant: 'error'});
        }
    }

    return (
        <div className="w-full flex flex-col items-center content-center justify-center 
        p-10">
            <h1 className="font-bold text-4xl">Add Cast</h1>
            <div className="w-[50%] flex py-5 items-center content-center">
                <div className="w-[25%] flex flex-col items-start content-center">
                    <label className="text-2xl py-[0.8rem]">Cast ID :</label>
                    <label className="text-2xl py-[0.8rem]">Name :</label>
                    <label className="text-2xl py-[0.8rem]">Role :</label>
                    <label className="text-2xl py-[0.8rem]">Bio Link :</label>
                    <label className="text-2xl py-[0.8rem]">Cast Photo :</label>
                </div>
                <div className="w-[75%] flex flex-col items-start content-center">
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={castId}
                        onChange={handleCastIdChange}
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
                        value={role}
                        onChange={handleRoleChange}
                        required
                    />
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={biolink}
                        onChange={handleBiolinkChange}
                        required
                    />
                    <CldUploadButton uploadPreset="cinema-express-cast-photo"
                    className="w-full text-xl p-2 text-black bg-white rounded-full
                    font-semibold hover:text-white hover:bg-black border-2 
                    border-white transition-all duration-15 cursor-pointer"
                    signatureEndpoint={'/api/admin/auth-upload'}>
                        Upload Photo
                    </CldUploadButton>
                </div>
            </div>
            <div className="w-full flex items-center content-center justify-evenly">
                <button className='p-2 bg-white text-black border-white 
                border-2 font-semibold text-xl rounded-full transition-all duration-200 
                mx-2 hover:bg-black hover:text-white'
                onClick={postCast}>
                    Add Cast
                </button>
            </div>
        </div>
    )
}