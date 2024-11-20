import { convertDate, convertIdr } from "@/components/libs/action/converter";
import { RiStarSFill } from "react-icons/ri";
import { MdComment } from "react-icons/md";

export default function UnavailableEvent({ name, price, date, location, description, rating, review }: { name: string, price: number, date: string, location: string, description: string, rating: number, review: string }) {
    return (
        <div className=" rounded-[12px] shadow-md bg-white">
            <div className="w-full justify-s flex flex-col gap-2 p-2 " >
                <p className="font-bold text-[18px] text-center">{name}</p>
            </div>
            <div className="p-4 flex flex-col gap-1">
                <p className="font-bold">{convertDate(date)}</p>
                <p className="font-medium">{convertIdr(price)}</p>
                <p>{location}</p>
                <p>{description}</p>
                <div className="bg-lightestpurple/25 shadow-lg  p-4 flex justify-between rounded-[10px]">
                    <p>REVIEW :</p>
                    <div className="font-medium text-[16px] flex items-center gap-1"><span><MdComment/></span><p>{review}</p></div>
                    <div className="font-extrabold text-[16px] flex items-center gap-1"><span><RiStarSFill /></span><p>{rating}</p></div>
                </div>
            </div>
        </div>
    )
}