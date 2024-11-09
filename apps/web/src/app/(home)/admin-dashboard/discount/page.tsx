import SidebarAdmin from "@/components/sidebar";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import FormCreateDiscount from "./_components/formcreatediscount";
import DeleteDiscount from "./_components/deletediscount";

export default function DiscountAdminDashboard() {
    return (
        <div className="relative w-full h-[1655px]  flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-darkblue/35 to-lightestcream bg-cover bg-center -scale-x-100 blur-sm -z-20"></div>
            <div className=" relative sm:[750px] md:w-[1350px] flex justify-center items-start gap-4 top-28 mx-4">
                <div className="sticky top-28">
                    <SidebarAdmin />
                </div>
                <div className="flex w-full flex-col gap-4">
                    <div className="flex flex-col gap-4 bg-white/50 rounded-[16px] p-2">
                        <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                            <p className="font-medium text-[20px] text-center">Discount</p>
                        </div>
                        <div>
                            <div className="flex justify-between gap-4">
                                <p className="w-1/2 rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4">ACTIVE</p>
                                {/* <p className="w-1/3 rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4">PENDING</p> */}
                                <p className="w-1/2 rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4">NOT ACTIVE</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 ">
                        <p className="font-medium text-[20px]">Create Discount for Event</p>
                        <FormCreateDiscount />
                    </div>
                    <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                        <p className="font-medium text-[20px]">Discount</p>
                        <div className="flex flex-col gap-2">
                            <div className=" p-2  flex flex-wrap justify-between">
                                <p>NAMA DISCOUNT</p>
                                <p className="border-[1px]"></p>
                                <p>EXPIRE DATE</p>
                                <p className="border-[1px]"></p>
                                <p>FOR EVENT?</p>
                                <p className="border-[1px]"></p>
                                <p>STOCK</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA DISCOUNT</p>
                                <p>EXPIRE DATE</p>
                                <p>FOR EVENT</p>
                                <p>STOCK</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA DISCOUNT</p>
                                <p>EXPIRE DATE</p>
                                <p>FOR EVENT</p>
                                <p>STOCK</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA DISCOUNT</p>
                                <p>EXPIRE DATE</p>
                                <p>FOR EVENT</p>
                                <p>STOCK</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA DISCOUNT</p>
                                <p>EXPIRE DATE</p>
                                <p>FOR EVENT</p>
                                <p>STOCK</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA DISCOUNT</p>
                                <p>EXPIRE DATE</p>
                                <p>FOR EVENT</p>
                                <p>STOCK</p>
                            </div>
                            <div className="flex gap-2 p-2 items-center">
                                <MdNavigateBefore className="cursor-pointer" size={30} />
                                <MdNavigateNext className="cursor-pointer" size={30} />
                                <p>PAGE # FROM ###</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 bg-red-300/30 rounded-[16px] p-2 border-[1px] border-red-400">
                        <DeleteDiscount />
                    </div>
                </div>
            </div>
        </div>
    )
}