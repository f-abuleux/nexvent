"use client"

import { convertDateDatabase, convertPrice } from "@/components/libs/action/converter";
import { IEventStatus } from "@/components/types/types";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

export default function EventList() {
    const [dataEvent, setDataEvent] = useState<IEventStatus>();
    const [page, setPage] = useState<number>(1);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const token = Cookies.get("token");

    const fetchEventData = async () => {
        const fetchData = await fetch(`http://localhost:8000/api/event/byid?page=${page}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            method: "GET"
        });
        const data = await fetchData.json();
        setDataEvent(data);
    };

    useEffect(() => {
        fetchEventData();
    }, [page]);

    const nextPage = () => {
        if (dataEvent?.totalPage && page < dataEvent.totalPage) {
            setIsAnimating(true);
            setTimeout(() => {
                setPage(page + 1);
                setIsAnimating(false);
            }, 800);
        }
    };

    const previousPage = () => {
        if (page > 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setPage(page - 1);
                setIsAnimating(false);
            }, 800);
        }
    };


    return (
        <div className="w-full rounded-[12px] shadow-md bg-white flex flex-col gap-2 p-4">
            <p className="font-medium text-[20px]">Events</p>
            <div className="flex flex-col gap-2">
                <div className="p-2 flex flex-wrap justify-between">
                    <p>NAMA EVENT</p>
                    <p className="border-[1px]"></p>
                    <p>TANGGAL EVENT</p>
                    <p className="border-[1px]"></p>
                    <p>HARGA EVENT</p>
                    <p className="border-[1px]"></p>
                    <p>STOCK</p>
                </div>

                <AnimatePresence mode="wait">
                    {isAnimating === false && dataEvent?.eventTotal.map((item, key) => (
                        <motion.div
                            key={key}
                            className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between"
                            initial={{ opacity: 0, translateX: -10 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            exit={{ opacity: 0, translateX: -10 }}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                                delay: key * 0.1
                            }}
                        >
                            <p>{item.title}</p>
                            <p>{convertDateDatabase(item.date)}</p>
                            <p>{convertPrice(item.price)}</p>
                            <p>{item.quantity}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <div className="flex gap-2 p-2 items-center">
                    <button onClick={previousPage}><MdNavigateBefore className="cursor-pointer" size={30} /></button>
                    <button onClick={nextPage}><MdNavigateNext className="cursor-pointer" size={30} /></button>
                    <p>PAGE {page} FROM {dataEvent?.totalPage}</p>
                </div>
            </div>
        </div>
    );
}
