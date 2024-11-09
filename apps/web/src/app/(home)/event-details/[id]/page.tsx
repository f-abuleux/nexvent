'use client'

import { convertPrice } from "@/components/converter";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { IoMdShare } from "react-icons/io";
import QuantityAndNotes from "./_components/quantityandnotes";
import EventCard from "./_components/eventcard";


export default function EventDetailsUser() {
    const [quantity, setQuantitiy] = useState(0)
    const [price, setPrice] = useState(100000)
    const totalPrice = quantity * price


    const increaseQuantity = () => {
        setQuantitiy(quantity + 1)
    }
    const decreaseQuantity = () => {
        setQuantitiy(quantity - 1)
        if (quantity == 0) setQuantitiy(0)
    }

    useEffect(() => {
        increaseQuantity
        decreaseQuantity
    }, [quantity, totalPrice])

    return (
        <div className="relative w-full h-[1605px]  flex flex-wrap justify-center ">
            <div className="absolute inset-0 bg-gradient-to-br from-darkblue/35 to-lightestcream bg-cover bg-center -scale-x-100 blur-sm -z-20"></div>
            <div className="flex justify-center items-start gap-4 mt-28 mx-4">
                <div className="sm:[650px] md:w-[800px] lg:w-[950px] items-center justify-center  rounded-md flex flex-col gap-4">
                    <div className="flex flex-col gap-5 items-center">
                        <Image src={"/dashboard.webp"} width={850} height={150} alt="" className="rounded-lg shadow-md" />
                        <div className="flex flex-col justify-start bg-white/30 p-4 rounded-[12px] backdrop-blur-sm gap-5">
                            <h1 className="font-medium text-[20px]">JUDUL NYE</h1>
                            <p className="text-left text-wrap w-full h-[115px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero alias explicabo perferendis voluptatem quod, dolorem soluta id nemo fuga velit cumque incidunt possimus quos, nihil omnis minus eum non dignissimos commodi iste. Maxime dolorem quidem voluptatibus? Blanditiis vel ratione tempore itaque enim obcaecati nisi doloremque qui error, quia minus officiis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea culpa optio veritatis fugiat sed voluptatibus cum a tenetur laborum harum laboriosam hic molestias impedit voluptas, vitae quisquam consequuntur? Magnam, laudantium!</p>
                        </div>
                    </div>
                </div>
                <QuantityAndNotes />
            </div>
            <div className="flex flex-wrap sm:[750px] md:w-[950px] lg:w-[1350px] justify-center gap-2 -z-10">
                <p className="font-bold text-[24px] text-left w-full mb-8 ml-12">OTHER FROM EVENT ORGANIZER</p>
                <div className="flex flex-wrap h-full w-full justify-center gap-4 ">
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
                </div>
            </div>
        </div>
    )
}