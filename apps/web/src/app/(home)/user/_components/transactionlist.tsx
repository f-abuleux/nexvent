"use client";

import { animationVariants } from "@/components/animation";
import { convertDate } from "@/components/converter";
import { ITransactionData } from "@/components/types/types";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

export default function TransactionListUser() {
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<ITransactionData>();
    const [currentData, setCurrentData] = useState<ITransactionData | null>(null);
    const token = Cookies.get("token");

    const fetchTransactionData = async (targetPage: number) => {
        try {
            const fetchData = await fetch(`http://localhost:8000/api/cart/byid/transaction?page=${targetPage}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const responseData = await fetchData.json();
            setData(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTransactionData(page);
    }, [page]);

    const nextPage = () => {
        if (data && page < data.totalPage) {
            setCurrentData(data); 
            setTimeout(() => {
                setPage(page + 1);
                setCurrentData(null); 
            }, 800); 
        }
    };

    const previousPage = () => {
        if (page > 1) {
            if (data) setCurrentData(data);
            setTimeout(() => {
                setPage(page - 1);
                setCurrentData(null);
            }, 800);
        }
    };

    return (
        <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4">
            <p className="font-medium text-[20px]">Transaction</p>
            <div className="flex flex-col gap-2">
                <div className="p-2 flex flex-wrap justify-between">
                    <p className="w-1/5">TRANSACTION DATE</p>
                    <p className="border-[1px]"></p>
                    <p className="w-1/5">EVENT NAME</p>
                    <p className="border-[1px]"></p>
                    <p className="w-1/5">QUANTITY</p>
                    <p className="border-[1px]"></p>
                    <p className="w-1/5">TOTAL PRICE</p>
                    <p className="border-[1px]"></p>
                    <p className="w-1/12">STATUS</p>
                </div>
                <AnimatePresence mode="wait">
                    {(currentData || data)?.cart.map((item, key) => (
                        <motion.div
                            key={item.cart_id}
                            className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between"
                            variants={animationVariants(key)}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={animationVariants(key).transition}
                        >
                            <p className="w-1/5">{convertDate(item.updated_at)}</p>
                            <p className="w-1/5">{item.Event.title}</p>
                            <p className="w-1/5">{item.quantity}</p>
                            <p className="w-1/5">{item.totalPrice}</p>
                            <p className="w-1/12">{item.status_order}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div className="flex gap-2 p-2 items-center">
                    <button onClick={previousPage}>
                        <MdNavigateBefore className="cursor-pointer" size={30} />
                    </button>
                    <button onClick={nextPage}>
                        <MdNavigateNext className="cursor-pointer" size={30} />
                    </button>
                    <p>
                        PAGE {page} FROM {data?.totalPage}
                    </p>
                </div>
            </div>
        </div>
    );
}
