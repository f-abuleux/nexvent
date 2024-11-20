"use client"

import { animationVariants } from "@/components/libs/action/animation";
import { convertIdr } from "@/components/libs/action/converter";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import PayCartOnlist from "./paycartlist";

interface ICart {
    title: string,
    totalPrice: number,
    quantity: number,
    cart_id: string,
    event_id: string
}

export default function CartList() {
    const [dataCart, setDataCart] = useState<Array<{ title: string; totalPrice: number; quantity: number; cart_id: string }>>([]);
    const token = Cookies.get("token");


    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/cart/byid?incart=true", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            const mergedData = result.getCart.map((cartItem: ICart) => {
                const event = result.events.find((event: any) => event.event_id === cartItem.event_id);
                return {
                    title: event ? event.title : "Unknown Event",
                    totalPrice: cartItem.totalPrice,
                    quantity: cartItem.quantity,
                    cart_id: cartItem.cart_id
                };
            });

            setDataCart(mergedData);
            console.log("Merged Cart Data:", mergedData);

        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    let totalPrice = 0;

    dataCart.map((item) =>
        totalPrice += item.totalPrice
    )



    return (
        <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4">
            <p className="font-medium text-[20px]">Your Cart</p>
            <p className="text-[12px] px-5 text-lightestpurple">Notes: all your cart will checkout at the same time. Make sure to check again which event you would like to pay for in the cart. Please remove events from the cart if you do not want to pay for them.</p>
            <div className="flex flex-col gap-2">
                <div className="p-2 flex flex-wrap justify-between">
                    <p>NAMA EVENT</p>
                    <p className="border-[1px]"></p>
                    <p>TOTAL PRICE</p>
                    <p className="border-[1px]"></p>
                    <p>QUANTITY</p>
                    <p className="border-[1px]"></p>
                    <p>OPTION</p>
                </div>
                <AnimatePresence mode="wait">
                    {
                        dataCart && dataCart.length > 0 ? (
                            dataCart && dataCart.map((item, key) => (
                                <motion.div key={key} className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between items-center"
                                    variants={animationVariants(key)}
                                    initial={animationVariants(key).initial}
                                    animate={animationVariants(key).animate}
                                    exit={animationVariants(key).exit}
                                    transition={animationVariants(key).transition}
                                >
                                    <p className="w-1/4">{item.title}</p>
                                    <p className="w-1/4">{convertIdr(item.totalPrice)}</p>
                                    <p className="w-1/4">{item.quantity}</p>
                                    <PayCartOnlist cart_id={item.cart_id} token={token} />
                                </motion.div>
                            ))
                        ) : (
                            <div className="w-full text-center font-roman">
                                ADD SOME EVENT YOUR CART AND WILL APPEAR RIGTH HERE
                            </div>
                        )

                        
                    }
                </AnimatePresence>
                <div className="flex flex-col w-full gap-2 mt-5 items-end justify-end">
                    <p className="p-1">{convertIdr(totalPrice)}</p>
                    <p className="bg-darkestblue rounded-[8px] p-2 font-bold text-white">CHECKOUT</p>
                </div>
            </div>
        </div>
    );
}
