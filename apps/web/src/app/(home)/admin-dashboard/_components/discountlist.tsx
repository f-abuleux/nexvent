"use client"

import { checkDiscount, convertDateDatabase } from "@/components/libs/action/converter";
import { IDiscountStatus } from "@/components/types/types";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion"
import { animationVariants } from "@/components/libs/action/animation";


export default function DiscountList() {
    const [dataDiscount, setDataDiscount] = useState<IDiscountStatus>()
    const token = Cookies.get("token")
    const [page, setPage] = useState<number>(1)
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const fetchDiscountData = async () => {
        const fetchData = await fetch(`http://localhost:8000/api/discount/byid?page=${page}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            method: "GET"
        })
        const data = await fetchData.json()
        setDataDiscount(data)
    }

    console.log(dataDiscount)

    useEffect(() => {
        fetchDiscountData()
    }, [page])

    const nextPage = () => {
        if (dataDiscount?.totalPage && page < dataDiscount?.totalPage) {
            setIsAnimating(true);
            setTimeout(() => {
                setPage(page + 1);
                setIsAnimating(false);
            }, 800);
        }
        return
    }

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
        <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
            <p className="font-medium text-[20px]">Discount</p>
            <div className="flex flex-col gap-2">
                <div className=" p-2  flex flex-wrap justify-between">
                    <p>DISCOUNT CODE</p>
                    <p className="border-[1px]"></p>
                    <p>DISCOUNT VALUE</p>
                    <p className="border-[1px]"></p>
                    <p>EXPIRE DATE</p>
                    <p className="border-[1px]"></p>
                    <p>ON-EVENT</p>
                    <p className="border-[1px]"></p>
                    <p>STOCK</p>
                </div>
                <AnimatePresence mode="wait">
                    {

                        dataDiscount?.discountTotal.map((item, key) => {
                            return (
                                <motion.div key={key} className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between"
                                    variants={animationVariants(key)}
                                    initial={animationVariants(key).initial}
                                    animate={animationVariants(key).animate}
                                    exit={animationVariants(key).exit}
                                    transition={animationVariants(key).transition}
                                >
                                    <p>{item.discount_code}</p>
                                    <p>{checkDiscount(item.discount_value)}</p>
                                    <p>{convertDateDatabase(item.end_date)}</p>
                                    <p>{item.discount_event.title}</p>
                                    <p>{item.discount_quota}</p>
                                </motion.div>
                            )
                        })
                    }
                </AnimatePresence>
                <div className="flex gap-2 p-2 items-center">
                    <button onClick={previousPage}><MdNavigateBefore className="cursor-pointer" size={30} /></button>
                    <button onClick={nextPage}><MdNavigateNext className="cursor-pointer" size={30} /></button>
                    <p>PAGE {page} FROM {dataDiscount?.totalPage}</p>
                </div>
            </div>
        </div>
    )
}