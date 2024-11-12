import SidebarAdmin from "@/components/sidebar";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import FormCreateDiscount from "./_components/formcreatediscount";
import DeleteDiscount from "./_components/deletediscount";
import DiscountList from "../_components/discountlist";
import DiscountStatus from "./_components/discountstatus";

export default function DiscountAdminDashboard() {
    return (
        <div className="relative w-full h-[1655px]  flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-darkblue/35 to-lightestcream bg-cover bg-center -scale-x-100 blur-sm -z-20"></div>
            <div className=" relative sm:[750px] md:w-[1350px] flex justify-center items-start gap-4 top-28 mx-4">
                <div className="sticky top-28">
                    <SidebarAdmin />
                </div>
                <div className="flex w-full flex-col gap-4">
                    <DiscountStatus/>
                    <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 ">
                        <p className="font-medium text-[20px]">Create Discount for Event</p>
                        <FormCreateDiscount />
                    </div>
                    <DiscountList />
                    <div className="flex flex-col gap-4 bg-red-300/30 rounded-[16px] p-2 border-[1px] border-red-400">
                        <DeleteDiscount />
                    </div>
                </div>
            </div>
        </div>
    )
}