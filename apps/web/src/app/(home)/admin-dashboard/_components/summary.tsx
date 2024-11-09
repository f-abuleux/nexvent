"use client"

import { IEventStatus } from "@/components/types/types"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export default function SummaryDashboard() {
    const [dataEvent, setDataEvent] = useState<IEventStatus>()
    const token = Cookies.get("token")

    const fetchEventData = async () => {
        const fetfchData = await fetch("http://localhost:8000/api/event/byid", {
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
    }, [])


    return (
        <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
            <p className="font-medium text-[20px]">Summary</p>
            <div className="flex flex-wrap gap-5 justify-center">
                <div className="w-1/5 flex justify-between items-center"><p>TOTAL EVENT</p><span>{dataEvent?.eventTotal.length}</span></div>
                <p className="border-[1px]"></p>
                <div className="w-1/5 flex justify-between">RAVENUE</div>
                <p className="border-[1px]"></p>
                <div className="w-1/5 flex justify-between">TOTAL JOINERS</div>
            </div>
        </div>
    )
}