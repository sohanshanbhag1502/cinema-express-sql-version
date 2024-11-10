import Seat from "@/components/Seat";

interface SeatRowProps{
    row:string;
    bookedList:Array<string>;
}

interface SeatLayoutProps{
    bookedList:Array<string>;
}

function SeatRow(props: SeatRowProps){
    const seatNums=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

    return (
        <div className="w-full flex items-center content-center justify-center py-3
        font-mono">
            <p className="text-2xl px-2">{props.row}</p>
            {seatNums.map((ele)=><Seat SeatNo={ele} booked={props.bookedList.findIndex(
                (seat)=>seat==props.row+'-'+ele)!=-1} seatRow={props.row} key={ele.toString()}/>)}
        </div>
    )
}

export function SeatLayout(props: SeatLayoutProps){
    const seatRows=["A","B","C","D","E","F","G","H"]

    return (
        <div className="w-full flex flex-col items-center content-center justify-center
        p-10">
            <div className="p-2 mb-10 mt-5 border-2 border-white text-center 
            w-full">Screen</div>
            {seatRows.map((ele)=><SeatRow row={ele} bookedList={props.bookedList} key={ele.toString()}/>)}
            <div className="w-full flex items-center content-center justify-center py-5">
                <div className='w-8 h-8 bg-black cursor-default
                border-2 font-semibold text-lg transition-all duration-200 mx-2
                flex items-center content-center justify-center'>
                    1
                </div> 
                <p className="pr-10">Booked</p>
                <div className='w-8 h-8 bg-white cursor-default text-black
                border-2 font-semibold text-lg transition-all duration-200 mx-2
                flex items-center content-center justify-center'>
                    1
                </div> 
                <p className="pr-10">Available</p>
                <div className='w-8 h-8 bg-black cursor-default border-green-600
                border-2 font-semibold text-lg transition-all duration-200 mx-2
                flex items-center content-center justify-center text-green-600'>
                    1
                </div> 
                <p>Selected</p>
            </div>
        </div>
    )
}