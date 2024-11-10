export function FootBar(){
    return (
        <div className="w-full flex content-center items-center justify-evenly 
        p-5 border-white border-t-2 text-center">
            <p>&copy; Copyright {Date().substring(11,15)} Cinema Express. All Rights Reserved</p>
        </div>
    )
}