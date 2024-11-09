"use client"

import { convertDateDatabase, convertPrice } from "@/components/converter";
import { IEventStatus } from "@/components/types/types";
import { data } from "cypress/types/jquery";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

export default function EventList() {
    const [dataEvent, setDataEvent] = useState<IEventStatus>()
    const token = Cookies.get("token")
    const [page, setPage] = useState<number>(1)

    const fetchEventData = async () => {
        const fetfchData = await fetch(`http://localhost:8000/api/event/byid?page=${page}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            method: "GET"
        })
        const data = await fetfchData.json()
        setDataEvent(data)
    }

    console.log(dataEvent)

    useEffect(() => {
        fetchEventData()
    }, [page])

    const nextPage = () => {
        if (dataEvent?.totalPage && page < dataEvent?.totalPage) {
            setPage(page + 1)
        }
        return
    }

    const previousPage = () => {
        if (page == 1) {
            return
        } {
            setPage(page - 1)
        }
    }

    return (
        <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
            <p className="font-medium text-[20px]">Events</p>
            <div className="flex flex-col gap-2">
                <div className=" p-2  flex flex-wrap justify-between">
                    <p>NAMA EVENT</p>
                    <p className="border-[1px]"></p>
                    <p>TANGGAL EVENT</p>
                    <p className="border-[1px]"></p>
                    <p>HARGA EVENT</p>
                    <p className="border-[1px]"></p>
                    <p>STOCK</p>
                </div>
                {

                    dataEvent?.eventTotal.map((item, key) => {
                        return (
                            <div key={key} className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>{item.title}</p>
                                <p>{convertDateDatabase(item.date)}</p>
                                <p>{convertPrice(item.price)}</p>
                                <p>{item.quantity}</p>
                            </div>
                        )
                    })
                }

                <div className="flex gap-2 p-2 items-center">
                    <button onClick={previousPage}><MdNavigateBefore className="cursor-pointer" size={30} /></button>
                    <button onClick={nextPage}><MdNavigateNext className="cursor-pointer" size={30} /></button>
                    <p>PAGE {page} FROM {dataEvent?.totalPage}</p>
                </div>
            </div>
        </div>
    )
}