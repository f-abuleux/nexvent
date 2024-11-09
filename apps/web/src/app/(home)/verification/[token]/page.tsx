"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function VerificationPage() {
    const params = useParams()
    const router = useRouter()

    const fetchUser = async () => {
        const updateUser = await fetch(`http://localhost:8000/api/auth/verifyinguser/${params.token}`, {
            method : "PATCH"
        })
    }

    setTimeout(() => {
        fetchUser()
        router.push("/")
    }, 5000)

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="relative w-full h-[1755px]  flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-darkblue/35 to-lightestcream bg-cover bg-center -scale-x-100 blur-sm -z-20"></div>
            <div className=" relative sm:[750px] md:w-[1350px] flex justify-center items-start gap-4 top-28 mx-4">
                <div className="flex flex-col gap-4 bg-white/50 rounded-[16px] p-2">
                    <div className="p-2 w-64">
                        <Image src={'/nexventtext2.png'} width={200} height={100} alt="" />
                    </div>
                    <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                        <p className="font-medium text-[20px] text-center">Account Verification</p>
                    </div>
                    <div>
                        <div className="flex justify-between items-center gap-4">
                            <p className="p-2">Start to verify your account and access all the NexVent Features</p>
                            <p className="w-1/2 rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 text-center">ACTIVATED</p>
                            {/* <p className="w-1/3 rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4">PENDING</p> */}
                            {/* <p className="w-1/2 rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4">PASS</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}