import SidebarUser from "@/components/sidebar-user";

export default function AccountDetails() {
    return (
        <div className="relative w-full h-[1605px] flex flex-wrap justify-center ">
            <div className="absolute inset-0 bg-gradient-to-br from-darkblue/35 to-lightestcream bg-cover bg-center -scale-x-100 blur-sm -z-20"></div>
            <div className="flex justify-center items-start gap-4 mt-28 mx-4">
                <div className="sm:[650px] md:w-[950px] lg:w-[1150px] items-start justify-center  rounded-[12px] flex gap-4">
                <div className="sticky top-28">
                        <SidebarUser />
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <div className="flex flex-col gap-4 bg-white/50 rounded-[16px] p-2 w-full">
                            <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                                <p className="font-medium text-[20px] text-center">Account Details</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}