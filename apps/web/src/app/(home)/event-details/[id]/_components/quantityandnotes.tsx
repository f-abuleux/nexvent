'use client'

import { convertPrice } from "@/components/converter";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { IoMdShare } from "react-icons/io";

export default function QuantityAndNotes() {
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
        <div className="bg-white w-72 h-[700px] bg-white/40 shadow-md rounded-[12px] p-4 gap-5 flex flex-col items-center">
            <p className="bg-white p-2 rounded-[6px] w-full text-center font-medium shadow-md">SET QUANTITY AND NOTES</p>
            <div className="flex flex-col justify-start w-full gap-4">
                <p className="text-left">QUANTITY</p>
                <input type="number" name="" id="" className="p-2 rounded-[6px] text-center " value={quantity} min="0" onChange={(e) => setQuantitiy(Number(e.target.value))} />
                <div className="w-full flex justify-around items-center gap-2">
                    <button onClick={increaseQuantity} className="bg-white w-1/2 p-2 rounded-[6px] flex gap-2 items-center font-medium"><IoMdAdd /> <p>Increase</p></button>
                    <button onClick={decreaseQuantity} className="bg-white w-1/2 p-2 rounded-[6px] flex gap-2 items-center font-medium"><IoMdRemove /><p>Decrease</p></button>
                </div>
                <p className="text-[12px]">Quantity can only added up to 0 below availablity</p>
                <p className="text-left font-bold text-[16px']">TICKET PRICE</p>
                <p className="text-left">{convertPrice(price)}</p>
                <input type="text" name="" id="" className="p-2 rounded-[6px] text-center " />
                <button className="bg-white w-full p-2 rounded-[6px]  items-center font-medium text-center"> <p>Apply Code</p></button>
                <p className="text-left font-bold text-[16px']">TOTAL PRICE</p>
                <p className="text-left">{convertPrice(totalPrice)}</p>
                <button className="p-2 border-white border-[1px] bg-white/20 rounded-[6px] font-bold">Add To Cart</button>
                <button className="p-2 border-white bg-white rounded-[6px] font-bold">Checkout</button>
                <div className="flex  items-center justify-center gap-4">
                    <div className="flex gap-2 items-center">
                        <IoMdShare size={16} />
                        <p className="font-bold text-[12px]">Share</p>
                    </div>
                </div>
            </div>
        </div>
    )
}