
import SidebarUser from "@/components/sidebar-user";
import TransactionListUser from "../_components/transactionlist";
import CartList from "../cart/_components/cartlist";

export default function TransactionUser() {
    return (
        <div className="relative w-full h-[1605px] flex flex-wrap justify-center ">
            <div className="absolute inset-0 bg-gradient-to-br from-darkblue/35 to-lightestcream bg-cover bg-center -scale-x-100 blur-sm -z-20"></div>
            <div className="flex justify-center items-start gap-4 mt-28 mx-4">
                <div className="sm:[650px] md:w-[950px] lg:w-[1150px] items-start justify-center  rounded-[12px] flex gap-4">
                    <div className="sticky top-28">
                        <SidebarUser />
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <TransactionListUser />
                        <CartList />
                    </div>
                </div>
            </div>
        </div>
    )
}