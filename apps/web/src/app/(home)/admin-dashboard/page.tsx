import OverviewAccount from "@/components/overviewaccount";
import OverviewAccountWrapper from "@/components/overviewaccountWRAP";
import SidebarAdmin from "@/components/sidebar";
import { MdNavigateNext, MdNavigateBefore, MdOutlineAccountCircle } from "react-icons/md";
import EventList from "./_components/eventslist";
import SummaryDashboard from "./_components/summary";

export default function AdminDashboard() {
    return (
        <div className="relative w-full h-[2155px]  flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-darkblue/35 to-lightestcream bg-cover bg-center -scale-x-100 blur-sm -z-20"></div>
            <div className=" sm:[750px] md:w-[1350px] flex justify-center items-start gap-4 mt-28 mx-4">
                <div className="sticky top-28">
                    <SidebarAdmin />
                </div>
                <div className="flex w-full flex-col gap-4">
                    <OverviewAccountWrapper />
                    <SummaryDashboard />
                   <EventList />
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
                    <div className="flex flex-col gap-4 bg-white/50 rounded-[16px] p-2">
                        <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                            <p className="font-medium text-[20px] text-center">Order Status</p>
                        </div>
                        <div>
                            <div className="flex justify-between gap-4">
                                <p className="w-1/3 rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4">SUCCESS</p>
                                <p className="w-1/3 rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4">PENDING</p>
                                <p className="w-1/3 rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4">FAILED</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                        <p className="font-medium text-[20px]">Performance</p>
                        <div className="flex flex-col gap-2">
                            <div className=" p-2  flex flex-wrap justify-between">
                                <p>NAMA PEMBELI</p>
                                <p className="border-[1px]"></p>
                                <p>TANGGAL TRANSAKSI</p>
                                <p className="border-[1px]"></p>
                                <p>NAMA EVENT</p>
                                <p className="border-[1px]"></p>
                                <p>BELI BERAPA</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA PEMBELI</p>
                                <p>TANGGAL TRANSAKSI</p>
                                <p>NAMA EVENT</p>
                                <p>BELI BERAPA</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA PEMBELI</p>
                                <p>TANGGAL TRANSAKSI</p>
                                <p>NAMA EVENT</p>
                                <p>BELI BERAPA</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA PEMBELI</p>
                                <p>TANGGAL TRANSAKSI</p>
                                <p>NAMA EVENT</p>
                                <p>BELI BERAPA</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA PEMBELI</p>
                                <p>TANGGAL TRANSAKSI</p>
                                <p>NAMA EVENT</p>
                                <p>BELI BERAPA</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA PEMBELI</p>
                                <p>TANGGAL TRANSAKSI</p>
                                <p>NAMA EVENT</p>
                                <p>BELI BERAPA</p>
                            </div>
                            <div className="flex gap-2 p-2 items-center">
                                <MdNavigateBefore className="cursor-pointer" size={30} />
                                <MdNavigateNext className="cursor-pointer" size={30} />
                                <p>PAGE # FROM ###</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 