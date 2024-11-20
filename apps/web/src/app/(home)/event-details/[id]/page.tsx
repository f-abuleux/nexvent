'use client'

import { convertDate, convertPrice } from "@/components/libs/action/converter";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { IoMdShare } from "react-icons/io";
import QuantityAndNotes from "./_components/quantityandnotes";
import EventCard from "./_components/eventcard";
import { useParams } from "next/navigation";
import { IDetailEvent } from "@/components/types/types";
import ParallaxText from "../../_components/ParallaxText";


export default function EventDetailsUser() {
    const [quantity, setQuantitiy] = useState(0)
    const [price, setPrice] = useState(100000)
    const totalPrice = quantity * price
    const [dataEvent, setDataEvent] = useState<IDetailEvent["detailEvent"]>()
    const params = useParams()

    console.log(params)


    const increaseQuantity = () => {
        setQuantitiy(quantity + 1)
    }
    const decreaseQuantity = () => {
        setQuantitiy(quantity - 1)
        if (quantity == 0) setQuantitiy(0)
    }

    const fetchEventDetailData = async () => {
        try {
            const fetchData: Response = await fetch(`http://localhost:8000/api/event/detail/${params.id}`, {
                method: "GET"
            })
            const eventData: IDetailEvent = await fetchData.json()
            setDataEvent(eventData.detailEvent)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(dataEvent)

    useEffect(() => {
        increaseQuantity()
        decreaseQuantity()
        fetchEventDetailData()
    }, [quantity, totalPrice])



    return (
        <div className="relative w-full h-[1605px]  flex flex-wrap justify-center ">
            <div className="absolute inset-0 bg-cover bg-center -z-20 opacity-10 grayscale-[50%]" style={{ backgroundImage: "url('/bg-detailevent2.webp')"  }}></div>
            <div className="flex justify-center items-start gap-4 mt-28 mx-4">
                <div className="sm:[650px] md:w-[800px] lg:w-[950px] items-center justify-center  rounded-md flex flex-col gap-4">
                    <div className="flex flex-col gap-5 p-4 w-full bg-white rounded-[10px] items-center">
                        <Image src={dataEvent?.image ?? "/dashboard.webp"} width={850} height={150} alt="" className="rounded-lg shadow-md " />
                        <div className="flex flex-col w-full justify-start p-4 rounded-[12px] backdrop-blur-sm gap-5 h-[350px]">
                            <div>
                                <h1 className="font-medium text-[24px]">{dataEvent?.title} </h1>
                                <p className="font-black text-[16px]">{convertDate(dataEvent?.date ?? "").toString()}</p>
                                <p className="font-normal text-[16px]">{dataEvent?.location}</p>
                                <p className="font-extralight text-[16px]">{dataEvent?.eventCategoryCategory_name}</p>
                            </div>
                            <p className="text-left text-wrap w-full ">{dataEvent?.description}</p>
                            <p className="text-left text-wrap w-full "></p>
                        </div>
                    </div>
                </div>
                <p className="h-full border-[1px]"></p>
                <QuantityAndNotes eventprice={dataEvent?.price ?? 0} eventquantity={dataEvent?.quantity ?? 0} />
            </div>
            <div className="relative ">
                <ParallaxText baseVelocity={-3} maindiv="parallaxmedium2"> OTHER FROM EVENT ORGANIZER. </ParallaxText>
            </div>
            <div className="flex flex-wrap sm:[750px] md:w-[950px] lg:w-[1350px] justify-center gap-2 -z-10">
                <div className="flex flex-wrap h-full w-full justify-center gap-4 ">
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
                </div>
            </div>
            <div className="relative ">
                <ParallaxText baseVelocity={3} maindiv="parallaxmedium2"> NEXVENT.NEXTVENT. </ParallaxText>
            </div>
        </div>
    )
}