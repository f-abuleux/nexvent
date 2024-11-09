import OverviewAccountWrapper from "@/components/overviewaccountWRAP";
import SidebarUser from "@/components/sidebar-user";
import { MdNavigateBefore, MdNavigateNext, MdOutlineAccountCircle } from "react-icons/md";

export default function UserDetail() {
    return (
        <div className="relative w-full h-[1605px] flex flex-wrap justify-center ">
            <div className="absolute inset-0 bg-gradient-to-br from-darkblue/35 to-lightestcream bg-cover bg-center -scale-x-100 blur-sm -z-20"></div>
            <div className="flex justify-center items-start gap-4 mt-28 mx-4">
                <div className="sm:[650px] md:w-[950px] lg:w-[1150px] items-start justify-center  rounded-[12px] flex gap-4">
                    <SidebarUser />
                    <div className="w-full flex flex-col gap-4">
                        <OverviewAccountWrapper />
                        <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                            <p className="font-medium text-[20px]">Transaction</p>
                            <div className="flex flex-col gap-2">
                                <div className=" p-2  flex flex-wrap justify-between">
                                    <p>TANGGAL TRANSAKSI</p>
                                    <p className="border-[1px]"></p>
                                    <p>NAMA EVENT</p>
                                    <p className="border-[1px]"></p>
                                    <p>BELI BERAPA</p>
                                    <p className="border-[1px]"></p>
                                    <p>TOTAL HARGA</p>
                                    <p className="border-[1px]"></p>
                                    <p>STATUS TRANSACTION</p>
                                </div>
                                <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">

                                    <p>TANGGAL TRANSAKSI</p>
                                    <p>NAMA EVENT</p>
                                    <p>BELI BERAPA</p>
                                    <p>TOTAL HARGA</p>
                                    <p>STATUS TRANSACTION</p>
                                </div>
                                <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">

                                    <p>TANGGAL TRANSAKSI</p>
                                    <p>NAMA EVENT</p>
                                    <p>BELI BERAPA</p>
                                    <p>TOTAL HARGA</p>
                                    <p>STATUS TRANSACTION</p>
                                </div>
                                <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">

                                    <p>TANGGAL TRANSAKSI</p>
                                    <p>NAMA EVENT</p>
                                    <p>BELI BERAPA</p>
                                    <p>TOTAL HARGA</p>
                                    <p>STATUS TRANSACTION</p>
                                </div>
                                <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">

                                    <p>TANGGAL TRANSAKSI</p>
                                    <p>NAMA EVENT</p>
                                    <p>BELI BERAPA</p>
                                    <p>TOTAL HARGA</p>
                                    <p>STATUS TRANSACTION</p>
                                </div>
                                <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">

                                    <p>TANGGAL TRANSAKSI</p>
                                    <p>NAMA EVENT</p>
                                    <p>BELI BERAPA</p>
                                    <p>TOTAL HARGA</p>
                                    <p>STATUS TRANSACTION</p>
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

        </div>
    )
}