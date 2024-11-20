"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/parallax";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Image from 'next/image';
import { motion, useInView } from "framer-motion";

import ParallaxText from "./ParallaxText";
import { useRef } from "react";


export default function Hero() {


    return (
        <motion.div
            initial={{ opacity: 0 , translateX : 20}}
            animate={{ opacity: 1 ,translateX : 0}}
            transition={{ delay: 1, ease : "easeInOut" }}
        >
            <div className="h-screen w-full flex items-center justify-center  ">

                <div
                    className="relative inset-0 top-0 z-0"
                    style={{
                        backgroundImage: "",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    data-swiper-parallax="-23%"
                ></div>

                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    speed={1000}
                    parallax={true}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    className="h-[85%] w-[99%] top-3 shadow-md rounded-[10px] grayscale-[40%]"
                >

                    <SwiperSlide className="flex items-center justify-center">
                        <Image
                            src="/heroimages/05f880a1-8aa6-4fd4-be8f-9f28e8da992e.webp"
                            layout="fill"
                            objectFit="cover"
                            alt="Slide 1 Image"

                        />
                    </SwiperSlide>

                    <SwiperSlide className="flex items-center justify-center">
                        <Image
                            src="/heroimages/3f416605-ef3b-450e-af3b-8779ac90b506.webp"
                            layout="fill"
                            objectFit="cover"
                            alt="Slide 2 Image"
                        />
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center">
                        <Image
                            src="/heroimages/7a80edf0-bd28-40a7-898e-10f717d119fc.webp"
                            layout="fill"
                            objectFit="cover"
                            alt="Slide 3 Image"
                        />
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center">
                        <Image
                            src="/heroimages/8b51a226-eb31-43bc-945a-b58bd70b9e0a.webp"
                            layout="fill"
                            objectFit="cover"
                            alt="Slide 4 Image"
                        />
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center">
                        <Image
                            src="/heroimages/65f51d85-a9e1-4945-87d6-26e3e4479f73.webp"
                            layout="fill"
                            objectFit="cover"
                            alt="Slide 5 Image"
                        />
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center">
                        <Image
                            src="/heroimages/465b19aa-b6d5-49a9-8877-1f21a55737e8.webp"
                            layout="fill"
                            objectFit="cover"
                            alt="Slide 6 Image"
                        />
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center">
                        <Image
                            src="/heroimages/c8ac1c79-6484-44e7-b048-a48c260f71ab.webp"
                            layout="fill"
                            objectFit="cover"
                            alt="Slide 7 Image"
                        />
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center">
                        <Image
                            src="/heroimages/d27a8e1e-517a-4b73-9234-4617c7c4d1ad.webp"
                            layout="fill"
                            objectFit="cover"
                            alt="Slide 8 Image"
                        />
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center">
                        <Image
                            src="/heroimages/16b75cdb-6e4f-4dcb-8163-546e5b18a142.webp"
                            layout="fill"
                            objectFit="cover"
                            alt="Slide 9 Image"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </motion.div>

    )
}