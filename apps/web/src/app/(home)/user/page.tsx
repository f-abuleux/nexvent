import OverviewAccountWrapper from "@/components/overviewaccountWRAP";
import SidebarUser from "@/components/sidebar-user";
import TransactionListUser from "./_components/transactionlist";
import ReferralCode from "./_components/referralcode";

export default function UserDetail() {
    return (
        <div className="relative w-full h-[1305px] flex flex-wrap justify-center ">
            <div className="absolute inset-0 bg-gradient-to-br from-darkblue/35 to-lightestcream bg-cover bg-center -scale-x-100 blur-sm -z-20"></div>
            <div className="flex justify-center items-start gap-4 mt-28 mx-4">
                <div className="sm:[650px] md:w-[950px] lg:w-[1150px] items-start justify-center  rounded-[12px] flex gap-4">
                    <div className="sticky top-28">
                        <SidebarUser />
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <OverviewAccountWrapper />
                        <ReferralCode />
                        <TransactionListUser />
                    </div>
                </div>
            </div>
        </div>
    )
}