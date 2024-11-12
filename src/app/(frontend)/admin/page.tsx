import Link from "next/link"

export default function AdminPage() {
    return (
        <div className="w-full flex flex-col content-center items-center justify-center
        p-10">
            <Link href='/admin/add-movies' 
            className="px-4 py-2 bg-white text-black text-2xl m-4 rounded-full
            hover:bg-black hover:text-white cursor-pointer transition-all duration-150
            border-2 border-white font-semibold">
                Add Movie
            </Link>
            <Link href='/admin/add-theaters' 
            className="px-4 py-2 bg-white text-black text-2xl m-4 rounded-full
            hover:bg-black hover:text-white cursor-pointer transition-all duration-150
            border-2 border-white font-semibold">
                Add Theater
            </Link>
            <Link href='/admin/add-casts' 
            className="px-4 py-2 bg-white text-black text-2xl m-4 rounded-full
            hover:bg-black hover:text-white cursor-pointer transition-all duration-150
            border-2 border-white font-semibold">
                Add Cast
            </Link>
            <Link href='/admin/add-screens' 
            className="px-4 py-2 bg-white text-black text-2xl m-4 rounded-full
            hover:bg-black hover:text-white cursor-pointer transition-all duration-150
            border-2 border-white font-semibold">
                Add Screen
            </Link>
            <Link href='/admin/add-movie-screen' 
            className="px-4 py-2 bg-white text-black text-2xl m-4 rounded-full
            hover:bg-black hover:text-white cursor-pointer transition-all duration-150
            border-2 border-white font-semibold">
                Add Movie to the screen
            </Link>
            <Link href='/admin/fetch-collections' 
            className="px-4 py-2 bg-white text-black text-2xl m-4 rounded-full
            hover:bg-black hover:text-white cursor-pointer transition-all duration-150
            border-2 border-white font-semibold">
                Calculate Movie Collections
            </Link>
        </div>
    )
}