"use client"

import { IDiscountStatus } from "@/components/types/types"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export default function DiscountStatus() {
    const token = Cookies.get('token')
    const [dataDiscount, setDataDiscount] = useState<IDiscountStatus>()

    const fetchDiscountData = async () => {
        const fetchData = await fetch(`http://localhost:8000/api/discount/byid`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            method: "GET"
        })
        const data = await fetchData.json()
        setDataDiscount(data)
    }

    useEffect(() => {
        fetchDiscountData()
    }, [])

    console.log(dataDiscount)

    return (
        <div className="flex flex-col gap-4 bg-white/50 rounded-[16px] p-2">
            <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                <p className="font-medium text-[20px] text-center">Discount</p>
            </div>
            <div>
                <div className="flex justify-between gap-4">
                    <p className="w-1/2 rounded-[12px] shadow-md bg-white justify-between flex gap-2 p-4">ACTIVE <span className="font-extrabold">{dataDiscount?.discountOnGoing.length}</span></p>
                    <p className="w-1/2 rounded-[12px] shadow-md bg-white justify-between flex gap-2 p-4">PASS <span className="font-extrabold">{dataDiscount?.discountPass.length}</span></p>
                </div>
            </div>
        </div>
    )
}