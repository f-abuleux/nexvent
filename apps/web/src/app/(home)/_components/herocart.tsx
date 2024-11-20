import { convertDate, convertIdr } from "@/components/libs/action/converter"
import Image from "next/image"

export default function HeroCart({title, price, date, quantity, description, image, link}: {title : string, price : number, date : string, quantity : number, description : string, image :string, link :string}) {
    return (
        <div className=" w-[400px] h-[520px] bg-white/50 backdrop-blur-sm rounded-[32px]">
            <section className="flex flex-col h-full gap-2 w-full rounded-[12px] p-2">
                <Image src={image} width={500} height={100} alt="thumbnail" className="w-full h-48 rounded-[26px] shadow-md" />
                <div className="p-4 flex flex-col h-full justify-between">
                    <div>
                        <p className="font-bold text-[20px]">{title}</p>
                        <p>{convertDate(date)}</p>
                        <p>{description}</p>
                    </div>
                        <p className="font-roman">Seat : {quantity}</p>
                        <p className="font-bold">{convertIdr(price)}</p>
                </div>
                <a href={`/event-details/${link}`} className="bg-darkestblue text-white p-4 font-bold rounded-[26px]">DETAIL</a>
            </section>
        </div>
    )
}