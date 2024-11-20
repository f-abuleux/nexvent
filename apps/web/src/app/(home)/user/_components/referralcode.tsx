"use client"

import { updateReferral } from "@/components/types/schema"
import { IReferral } from "@/components/types/types"
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"
import Cookies from "js-cookie"

export default function ReferralCode() {
    const token = Cookies.get("token")

    const initialValues: IReferral = {
        referred_code: ""
    }

    const updateFetchData = async (data: IReferral) => {
        try {
            const updateData = await fetch('http://localhost:8000/api/auth/update/point', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            if (!updateData.ok) {
                throw new Error(`HTTP error! status: ${updateData.status}`);
            }

            const result = await updateData.json();
            console.log("API Response:", result);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col gap-4 bg-white/50 rounded-[16px] p-2 w-full">
            <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                <p className="font-medium text-[20px] text-center">Referral Code</p>
            </div>
            <div className="p-2 text-[12px]">
                <p>*Referral code can only be used once per account and must use another account's referral code.</p>
                <p>*After verifying a new account, the referral code is generated.</p>
                <p>*When you successfully enter a referral code, the account using the referral code will receive 10,000 points, and the account whose referral code was used will receive a 10% discount for one month.</p>
                <p>*Every 1 point worth of 1 Rupiah</p>
            </div>
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={updateReferral}
                    onSubmit={(value, action) => {
                        console.log(value)
                        updateFetchData(value)
                        action.resetForm()
                    }}
                >
                    {() => (
                        <Form>
                            <div className="flex justify-between gap-4">
                                <Field
                                    type="text"
                                    name="referred_code"
                                    placeholder="Input Referral Code"
                                    className="w-4/5 rounded-[12px] shadow-md bg-white flex flex-col gap-2 p-2 border border-transparent focus:ring-0 outline-none"
                                />


                                <button type="submit" className="w-1/5 rounded-[12px] shadow-md bg-white items-center flex flex-col gap-2 p-2 text-center">SUBMIT</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}