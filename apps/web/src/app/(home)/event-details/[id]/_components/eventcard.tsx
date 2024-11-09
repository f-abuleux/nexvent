import Image from "next/image"



export default function EventCard() {
    return (
        <div className="bg-white/80 shadow-md backdrop-blur-sm w-[300px] h-[450px] rounded-[12px] overflow-hidden">
            <div>
                <Image src={"/dashboard.webp"} height={100} width={350} alt="" className="object-cover " />
                <div className="p-4 flex flex-col gap-2 justify-between h-[285px]" >
                    <div>
                        <p className="font-bold">NAME</p>
                        <p className="">DESCRIPTION</p>
                    </div>
                    <div className="">
                        <p className="">PRICE</p>
                        <p className="">AVAILABLITY</p>
                    </div>
                </div>
            </div>
        </div>
    )
}