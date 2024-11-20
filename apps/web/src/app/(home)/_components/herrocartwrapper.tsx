"use client"

import { useEffect, useState } from "react";
import HeroCart from "./herocart";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

interface IHeroCart {
    getEvent: [
        {
            title: string,
            price: number,
            description: string,
            image: string,
            quantity: number,
            location: string,
            date: string,
            event_id: string
        }
    ],
    totalPage: number
}


export default function HeroCartWrapper() {
    const [dataEvent, setDataEvent] = useState<IHeroCart>()
    const [page, setPage] = useState<number>(1)

    const fetchDataEvent = async () => {
        const fetchData = await fetch(`http://localhost:8000/api/event?page=${page}`, {
            method: "GET",
            headers: {
                "Conten-Type": "application/json"
            }
        })
        const data = await fetchData.json()
        setDataEvent(data)
    }

    const nextPage = () => {
        if (dataEvent && page < dataEvent.totalPage) {
            setPage(page + 1);
        }
    }

    const previousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }


    useEffect(() => {
        fetchDataEvent()
    }, [page])

    console.log(dataEvent)

    return (
        <div className="w-full">
            <div className="relative -top-44 w-full px-12 flex flex-row flex-wrap justify-center gap-4 items-center ">
                {
                    dataEvent && dataEvent.getEvent.map((event, index) => {
                        return (
                            < div className="">
                                <HeroCart title={event.title} description={event.description} date={event.date} quantity={event.quantity} image={event.image} link={event.event_id} price={event.price} />
                            </div>
                        )
                    })
                }
            </div >
            <div className="absolute -bottom-[550px] left-10 text-white rotate-90">
                <button 
                    onClick={previousPage} className="transition-transform transform hover:scale-110 active:scale-90">
                    <MdNavigateBefore className="cursor-pointer" size={50} />
                </button>
                <button onClick={nextPage} className="transition-transform transform hover:scale-110 active:scale-90">
                    <MdNavigateNext className="cursor-pointer" size={50} />
                </button>
            </div>
        </div>
    )
}