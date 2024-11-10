import { Filters } from "@/app/(frontend)/(header-footer)/search/page";

function FilterButton(props:{category:string, text:string, filterList:Filters, 
    setFilter:React.Dispatch<React.SetStateAction<Filters>>}) {
    const category=props.category!=='Age Rating'?props.category.toLowerCase():
    "ageRating";
    return (
        <button className={"text-xl rounded-full px-2 my-2 mr-2 \
        border-2 transition-all duration-150 bg-black "+(
        (props.filterList as any)[category]!==props.text.replace('+', 'plus')? 
        "text-white border-white hover:text-black hover:bg-white": 
        "text-green-700 border-green-700")}
        disabled={(props.filterList as any)[category]===props.text}
        onClick={()=>{
            if (props.category=="Genre"){
                props.setFilter({...props.filterList, genre:props.text})
            }
            else if (props.category=="Age Rating"){
                props.setFilter({...props.filterList, ageRating:props.text.replace('+', 'plus')})
            }
            else if (props.category=="City"){
                props.setFilter({...props.filterList, city:props.text})
            }
            else if (props.category=="Language"){
                props.setFilter({...props.filterList, language:props.text})
            }
        }}>
            {props.text}
        </button>
    )
}

function FilterList(props:{category:string, categories:string[], filterList:Filters, 
    setFilter:React.Dispatch<React.SetStateAction<Filters>>}){
    return (
        <div className="w-full flex-wrap items-center content-center py-5">
            <p className="text-2xl">{props.category}:</p>
            {props.categories.map((category)=><FilterButton text={category}
            filterList={props.filterList} setFilter={props.setFilter} key={category}
            category={props.category}/>)}
        </div>
    )
}

export default function FilterMenu(props:{filterList:Filters, 
    setFilter:React.Dispatch<React.SetStateAction<Filters>>}) {
    const ageRatings=["U+","UA+","A+"];
    const genres=["Comedy","Drama","Action","Thriller","Horror","Romance","SciFi",
        "Fantasy","Adventure","Mystery","Crime","Documentary","History","Animation",
        "Fiction","Biography"]
    const city=["Bengaluru", "Chennai", "Chandigarh", "Delhi", "Hyderabad", "Pune", 
        "Mumbai", "Kochi", "Trivandrum"];
    const languages=["English", "Hindi", "Telugu", "Kannada", "Tamil", 
        "Malayalam", "Marathi",]
    return (
        <div className="absolute w-[95%] bg-opacity-70 bg-black backdrop-blur-lg z-40 
        p-5 h-full">
            <h1 className="font-semibold text-3xl">Add filters</h1>
            <FilterList category="Genre" categories={genres} 
            setFilter={props.setFilter} filterList={props.filterList}/>
            <FilterList category="Age Rating" categories={ageRatings} 
            setFilter={props.setFilter} filterList={props.filterList}/>
            <FilterList category="City" categories={city} 
            setFilter={props.setFilter} filterList={props.filterList}/>
            <FilterList category="Language" categories={languages} 
            setFilter={props.setFilter} filterList={props.filterList}/>
        </div>
    )
}