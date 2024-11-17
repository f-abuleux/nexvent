"use client"

import { MdOutlineAccountCircle } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaClipboardList } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";



export default function SidebarUser() {
    const router = useRouter()

    const deleteCookie = () => {
        Cookies.remove("token")
        setTimeout(()=> {
            router.push("/")
        }, 200)
    }

    return (
        <div className="h-[750px] w-[300px] bg-white/40 rounded-[12px] shadow-md ">
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
                    <div className="flex gap-2 items-center">
                        <GoHomeFill size={30} />
                        <p>Overview</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <MdManageAccounts size={30} />
                        <p>Account</p>
                    </div>
                    {/* <div className="flex gap-2 items-center">
                        <MdEvent size={30} />
                        <p>Event</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <BiSolidDiscount size={30} />
                        <p>Discount</p>
                    </div> */}
                    <div className="flex gap-2 items-center">
                        <FaClipboardList size={30} />
                        <p>Transaction</p>
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