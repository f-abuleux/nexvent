import SidebarAdmin from "@/components/sidebar";
import Image from "next/image";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";


export default function OrderAdminDashboard() {
    return (
        <div className="relative w-full h-[1755px]  flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-darkblue/35 to-lightestcream bg-cover bg-center -scale-x-100 blur-sm -z-20"></div>
            <div className=" relative sm:[750px] md:w-[1350px] flex justify-center items-start gap-4 top-28 mx-4">
                <div className="sticky top-28">
                    <SidebarAdmin />
                </div>
                <div className="flex w-full flex-col gap-4">
                    <div className="flex flex-col gap-4 bg-white/50 rounded-[16px] p-2">
                        <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                            <p className="font-medium text-[20px] text-center">Order</p>
                        </div>
                        <div>
                            <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >

                                <div className="flex flex-col gap-2">
                                    <div className=" p-2  flex flex-wrap justify-between">
                                        <p>BUKTI  TRANSAKSI</p>
                                        <p className="border-[1px]"></p>
                                        <p>NAMA PEMBELI</p>
                                        <p className="border-[1px]"></p>
                                        <p>KODE TRANSAKSI</p>
                                        <p className="border-[1px]"></p>
                                        <p>ACC</p>
                                        <p className="border-[1px]"></p>
                                        <p>CANCELED</p>
                                    </div>
                                    <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between items-center">
                                        <Image src={'/nexvent.png'} width={150} height={0} alt="" />
                                        <p>NAMA PEMBELI </p>
                                        <p>KODE TRANSAKSI</p>
                                        <p>ACC</p>
                                        <p>CANCELED</p>
                                    </div>
                                    <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between items-center">
                                        <Image src={'/nexvent.png'} width={150} height={0} alt="" />
                                        <p>NAMA PEMBELI </p>
                                        <p>KODE TRANSAKSI</p>
                                        <p>ACC</p>
                                        <p>CANCELED</p>
                                    </div>
                                    <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between items-center">
                                        <Image src={'/nexvent.png'} width={150} height={0} alt="" />
                                        <p>NAMA PEMBELI </p>
                                        <p>KODE TRANSAKSI</p>
                                        <p>ACC</p>
                                        <p>CANCELED</p>
                                    </div>
                                    <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between items-center">
                                        <Image src={'/nexvent.png'} width={150} height={0} alt="" />
                                        <p>NAMA PEMBELI </p>
                                        <p>KODE TRANSAKSI</p>
                                        <p>ACC</p>
                                        <p>CANCELED</p>
                                    </div>
                                    <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between items-center">
                                        <Image src={'/nexvent.png'} width={150} height={0} alt="" />
                                        <p>NAMA PEMBELI </p>
                                        <p>KODE TRANSAKSI</p>
                                        <p>ACC</p>
                                        <p>CANCELED</p>
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
                    <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 ">
                        <p className="font-medium text-[20px]">Create Discount for Event</p>

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
                                <p className="border-[1px]"></p>
                                <p>STATUS TRANSACTION</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA PEMBELI</p>
                                <p>TANGGAL TRANSAKSI</p>
                                <p>NAMA EVENT</p>
                                <p>BELI BERAPA</p>
                                <p>STATUS TRANSACTION</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA PEMBELI</p>
                                <p>TANGGAL TRANSAKSI</p>
                                <p>NAMA EVENT</p>
                                <p>BELI BERAPA</p>
                                <p>STATUS TRANSACTION</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA PEMBELI</p>
                                <p>TANGGAL TRANSAKSI</p>
                                <p>NAMA EVENT</p>
                                <p>BELI BERAPA</p>
                                <p>STATUS TRANSACTION</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA PEMBELI</p>
                                <p>TANGGAL TRANSAKSI</p>
                                <p>NAMA EVENT</p>
                                <p>BELI BERAPA</p>
                                <p>STATUS TRANSACTION</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA PEMBELI</p>
                                <p>TANGGAL TRANSAKSI</p>
                                <p>NAMA EVENT</p>
                                <p>BELI BERAPA</p>
                                <p>STATUS TRANSACTION</p>
                            </div>
                            <div className="flex gap-2 p-2 items-center">
                                <MdNavigateBefore className="cursor-pointer" size={30} />
                                <MdNavigateNext className="cursor-pointer" size={30} />
                                <p>PAGE # FROM ###</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex flex-col gap-4 bg-red-300/30 rounded-[16px] p-2 border-[1px] border-red-400">
                    </div> */}
                </div>
            </div>
        </div>
    )
}