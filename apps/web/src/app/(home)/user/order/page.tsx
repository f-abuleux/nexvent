import { CgProfile } from "react-icons/cg";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

export default function UserOrder() {
    return (
        <div className="relative w-full h-[1605px] flex flex-wrap justify-center ">
            <div className="absolute inset-0 bg-gradient-to-br from-darkblue/35 to-lightestcream bg-cover bg-center -scale-x-100 blur-sm -z-20"></div>
            <div className="flex justify-center items-start gap-4 mt-28 mx-4">
                <div className="sm:[650px] md:w-[800px] lg:w-[950px] items-center justify-center  rounded-[12px] flex flex-col gap-4">
                    <div className="flex w-full flex-col gap-4">
                        <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                            <p className="font-medium text-[20px] flex gap-2 items-center"> <CgProfile size={50} /> <span>NAMA</span></p>
                            <div className="flex flex-wrap justify-between">
                                <p>POINTS</p>
                                <p className="border-[1px]"></p>
                                <p>TOTAL CART</p>

                            </div>
                        </div>
                    </div>
                    <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                        <p className="font-medium text-[20px]">Your Cart</p>
                        <div className="flex flex-col gap-2">
                            <div className=" p-2  flex flex-wrap justify-between">
                                <p>NAMA EVENT</p>
                                <p className="border-[1px]"></p>
                                <p>TOTAL PRICE</p>
                                <p className="border-[1px]"></p>
                                <p>BELI BERAPA</p>
                                <p className="border-[1px]"></p>
                                <p>REMOVE</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA  EVENT</p>
                                <p>TOTAL PRICE</p>
                                <p>BELI BERAPA</p>
                                <p>REMOVE</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA  EVENT</p>
                                <p>TOTAL PRICE</p>
                                <p>BELI BERAPA</p>
                                <p>REMOVE</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA  EVENT</p>
                                <p>TOTAL PRICE</p>
                                <p>BELI BERAPA</p>
                                <p>REMOVE</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA  EVENT</p>
                                <p>TOTAL PRICE</p>
                                <p>BELI BERAPA</p>
                                <p>REMOVE</p>
                            </div>
                            <div className="bg-lightestcream/50 rounded-[8px] w-full p-2 shadow-md flex flex-wrap justify-between">
                                <p>NAMA  EVENT</p>
                                <p>TOTAL PRICE</p>
                                <p>BELI BERAPA</p>
                                <p>REMOVE</p>
                            </div>
                            <div className="flex flex-col w-full gap-2 mt-5 items-end justify-end">
                                <p className="p-1">TOTAL PRICE</p>

                                <p className="bg-darkestblue rounded-[8px] p-2 font-bold text-white">CHECKOUT</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}