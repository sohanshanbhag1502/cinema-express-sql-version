import { CircularProgress } from "@mui/material"

export function Loader(){
    return (
        <div className="absolute w-full h-screen flex flex-col items-center 
        content-center justify-center bg-black z-50 bg-opacity-65 backdrop-blur-[1px]">
            <CircularProgress size={80}/>
            <p>&nbsp;&nbsp;Loading...</p>
        </div>
    )
}