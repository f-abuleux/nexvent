"use client"

import { MdOutlineAccountCircle } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { MdEvent } from "react-icons/md";
import { BiSolidDiscount } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";



export default function SidebarAdmin() {
    const router = useRouter()

    const deleteCookie = () => {
        Cookies.remove("token")
        router.push("/")
    }

    return (
        <div className="h-[750px] w-60 bg-white/40 rounded-[12px] shadow-md ">
            <div className="flex h-full flex-col p-5 justify-between gap-5 text-[20px]">
                <div className="flex flex-col gap-5">
                    <div className="flex gap-2 items-center">
                        <div>
                            <MdOutlineAccountCircle size={40} />
                        </div>
                        <div className="text-[14px]">
                            <p>NAMA</p>
                            <p>EMAIL</p>
                        </div>
                    </div>
                    <p className="border-[1px] border-white"></p>
                    <a href="/admin-dashboard" className="flex gap-2 items-center">
                        <GoHomeFill size={30} />
                        <p>Overview</p>
                    </a>
                    <a href="/admin-dashboard/event" className="flex gap-2 items-center">
                        <MdEvent size={30} />
                        <p>Event</p>
                    </a>
                    <a href="/admin-dashboard/discount" className="flex gap-2 items-center">
                        <BiSolidDiscount size={30} />
                        <p>Discount</p>
                    </a>
                    <a href="/admin-dashboard/order" className="flex gap-2 items-center">
                        <FaClipboardList size={30} />
                        <p>Order</p>
                    </a>
                    <div className="flex gap-2 items-center">
                        <MdManageAccounts size={30} />
                        <p>Account</p>
                    </div>
                </div>
                <button onClick={deleteCookie} className="flex  gap-2">
                    <TbLogout size={30} />
                    <p>Logout</p>
                </button>
            </div>
        </div>
    )
}