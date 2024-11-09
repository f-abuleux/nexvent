import Image from "next/image";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function OverviewAccount({name, email, point, referral_code, image, success, pending, failed}: { name : string, email: string, point : number, referral_code : string, image : string, success : number, pending : number, failed : number }) {
    return (
        <div className="flex flex-col gap-4 bg-white/50 rounded-[16px] p-2 w-full">
            <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                <p className="font-medium text-[20px] text-center">Account Overview</p>
            </div>
            <div className="p-4 flex gap-4 items-center justify-center">
                {
                    image? <Image src={image} height={200} width={200} alt="" /> : <MdOutlineAccountCircle size={204} />  
                }
                <div className="flex gap-5 flex-col">
                    <p>{name}</p>
                    <p>{email}</p>
                    <p><span className="font-bold">Point : </span>{point}</p>
                    <p><span className="font-bold">Referral Code : </span>{referral_code}</p>
                </div>
            </div>
            <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                <p className="font-medium text-[20px] text-center">Transaction Status</p>
            </div>
            <div>
                <div className="flex justify-between gap-4">
                    <p className="w-1/3 rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4">SUCCESS</p>
                    <p className="w-1/3 rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4">PENDING</p>
                    <p className="w-1/3 rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4">FAILED</p>
                </div>
            </div>
        </div>
    )
}