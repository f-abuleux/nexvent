"use client"

import Image from "next/image";
import Hero from "./herong";
import { motion } from "framer-motion";

export default function NexventHeroText() {
    return (
        <div className="relative -top-48">
            <motion.p className="absolute z-50 w-full right-10 bottom-32 text-end  text-white  text-[1rem] h-full  items-center place-content-end font-bold"
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ ease: "easeOut" , delay :2 }}
            >WELCOME TO, </motion.p>
            <motion.div
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ ease: "easeOut", delay :2  }}
                className="absolute z-40 w-full top-[350px] right-10 text-center flex justify-end text-[8rem] text-white h-full  items-center place-content-end font-extrabold"><Image src={"/nexventtext2.png"} height={1000} width={1000} alt="" className="w-[250px]" />
            </motion.div>
            <Hero />
        </div>
    )
}