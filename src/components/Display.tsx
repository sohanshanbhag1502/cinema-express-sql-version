import { Categories } from "@/components/Categories"

export default function Display() {
    return (
        <div className="w-full flex flex-col content-center justify-start items-center 
        my-4 text-left">
            <Categories title="city" categories={["Bengaluru", "Chennai", "Chandigarh",
                "Delhi", "Hyderabad", "Pune", "Mumbai", "Kochi", "Trivandrum"]}/>
            <Categories title="genre" categories={["Comedy", "Horror", "Action", "Drama",
                "SciFi","Thriller", "Adventure", "Documentary", "Mystery",
                "History", "Animation", "Fiction", "Fantasy", "Crime", "Biography"]}/>
            <Categories title="language" categories={["English", "Hindi", "Telugu", 
                "Kannada", "Malayalam", "Tamil", "Marathi"]}/>
            <Categories title="ageRating" categories={["U+", "UA+", "A+"]}/>
        </div>
    )
}