"use client"

import { MdOutlineAccountCircle } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaClipboardList } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { MdRateReview } from "react-icons/md";


export default function SidebarUser() {
    const router = useRouter()

    const token = Cookies.get("token")
    let payload;
    try {
        if (token) {
            payload = JSON.parse(atob(token.split('.')[1]));
        }
    } catch (error) {
        console.log(error)
    }

    const deleteCookie = () => {
        Cookies.remove("token")
        setTimeout(() => {
            router.push("/")
        }, 200)
    }

    return (
        <div className="h-[750px] w-60 bg-white/40 rounded-[12px] shadow-md ">
            <div className="flex h-full flex-col p-5 justify-between gap-5 text-[20px]">
                <div className="flex flex-col gap-5">
                    <div className="flex gap-2 items-center">
                        <div>
                            <MdOutlineAccountCircle size={44} />
                        </div>
                        <div className="text-[14px]">
                            <p className="font-bold">{payload.first_name}</p>
                            <p className="font-normal text-[10px]">{payload.email}</p>
                        </div>
                    </div>
                    <p className="border-[1px] border-white"></p>
                    <a href="/user" className="flex gap-2 items-center">
                        <GoHomeFill size={30} />
                        <p>Overview</p>
                    </a>
                    <a href="/user/account-details" className="flex gap-2 items-center">
                        <MdManageAccounts size={30} />
                        <p>Account</p>
                    </a>
                    <a href="/user/review" className="flex gap-2 items-center">
                        <MdRateReview size={30} />
                        <p>Review</p>
                    </a>
                    {/* <div className="flex gap-2 items-center">
                        <BiSolidDiscount size={30} />
                        <p>Discount</p>
                    </div> */}
                    <a href="/user/transaction" className="flex gap-2 items-center">
                        <FaClipboardList size={30} />
                        <p>Transaction</p>
                    </a>
                </div>
                <button onClick={deleteCookie} className="flex  gap-2">
                    <TbLogout size={30} />
                    <p>Logout</p>
                </button>
            </div>
        </div>
    )
}