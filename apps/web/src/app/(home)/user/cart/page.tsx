"use client"

import { CgProfile } from "react-icons/cg";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import CartList from "./_components/cartlist";
import { useEffect, useState } from "react";
import { IUserData } from "@/components/types/types";
import Cookies from "js-cookie";

export default function UserOrder() {

    const [dataUser, setDataUser] = useState<IUserData>()
    const token = Cookies.get("token")


    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/auth/user", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok )  {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const resultUser = await response.json();

            setDataUser(resultUser.user);

            console.log(resultUser.user);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="relative w-full h-[1605px] flex flex-wrap justify-center ">
            <div className="absolute inset-0 bg-gradient-to-br from-darkblue/35 to-lightestcream bg-cover bg-center -scale-x-100 blur-sm -z-20"></div>
            <div className="flex justify-center items-start gap-4 mt-28 mx-4">
                <div className="sm:[650px] md:w-[800px] lg:w-[950px] items-center justify-center  rounded-[12px] flex flex-col gap-4">
                    <div className="flex w-full flex-col gap-4">
                        <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                            <p className="font-medium text-[20px] flex gap-2 items-center"> <CgProfile size={50} /> <span>{dataUser?.first_name} {dataUser?.last_name}</span></p>
                            <div className="flex flex-wrap justify-between">
                                <p>Your Point : {dataUser?.point}</p>
                                <p className="border-[1px]"></p>
                                <p>TOTAL CART</p>

                            </div>
                        </div>
                    </div>
                    <CartList />
                </div>
            </div>
        </div>
    )
}