import { animationVariants } from "@/components/animation";
import { convertIdr } from "@/components/converter";
import { ICartData } from "@/components/types/types";
import { AnimatePresence , motion} from "framer-motion";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function CartList() {
    const [dataCart, setDataCart] = useState<Array<{ title: string; totalPrice: number; quantity: number }>>([]);
    const token = Cookies.get("token");

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/cart/byid", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            const mergedData = result.getCart.map((cartItem: any) => {
                const event = result.events.find((event: any) => event.event_id === cartItem.event_id);
                return {
                    title: event ? event.title : "Unknown Event",
                    totalPrice: cartItem.totalPrice,
                    quantity: cartItem.quantity,
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
                    <p>REMOVE</p>
                </div>
                <AnimatePresence mode="wait">
                    {
                        dataCart && dataCart.map((item, key) => (
                            <motion.div key={key} className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between items-center"
                            variants={animationVariants(key)}
                            initial={animationVariants(key).initial}
                            animate={animationVariants(key).animate}
                            exit={animationVariants(key).exit}
                            transition={animationVariants(key).transition}  
                            >
                                <p>{item.title}</p>
                                <p>{convertIdr(item.totalPrice)}</p>
                                <p>{item.quantity}</p>
                                <button className="bg-lightestpurple rounded-[6px] text-[12px] text-white p-1">REMOVE</button>
                            </motion.div>
                        ))
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
