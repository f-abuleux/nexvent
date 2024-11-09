"use client"

import { createDiscountEventSchema } from "@/components/schema";
import { ICreateDiscount, IEventStatus } from "@/components/types/types";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function FormCreateDiscount() {
    const initialValues: ICreateDiscount = {
        discount_code: '',
        discount_value: 0,
        discount_quota: 0,
        type: "FIX",
        start_date: '',
        end_date: '',
        discount_event_event_id: ""
    };

    const [dataEvent, setDataEvent] = useState<IEventStatus>()
    const token = Cookies.get("token")

    const fetchEventData = async () => {
        const fetfchData = await fetch("http://localhost:8000/api/event/byid", {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            method: "GET"
        })
        const data = await fetfchData.json()
        setDataEvent(data)
    }

    console.log(dataEvent)

    useEffect(() => {
        fetchEventData()
    }, [])


    const createDiscountEvent = async (data: ICreateDiscount, actions: FormikHelpers<ICreateDiscount>) => {

    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={createDiscountEventSchema}
                onSubmit={(values, action) => {
                    console.log(values);
                    action.resetForm()
                }}
            >
                {({ isSubmitting, values }) => (
                    <Form className="flex flex-col gap-5 p-4">
                        <p>Discount Code</p>
                        <div className="w-full">
                            <Field name="discount_code" placeholder="Discount Code" className="p-2 border-[1px] w-full rounded-[12px]" />
                            <ErrorMessage name="discount_code" component="div" className="text-darkpurplered text-[12px]" />
                        </div>

                        <p>Discount Value</p>
                        <div>
                            <Field name="discount_value" placeholder="Discount Value" type="number" className="p-2 border-[1px] w-full rounded-[12px]" />
                            <ErrorMessage name="discount_value" component="div" className="text-darkpurplered text-[12px]" />
                        </div>

                        <p>Discount Value Type</p>
                        <div>
                            <div className="text-darkestblue mt-2 text-[12px]">
                                {values.type === "FIX"
                                    ? "Fix type instantly decreases ticket price!"
                                    : "Percentage type decreases the price by a percentage from ticket price!"
                                }
                            </div>
                            <Field as="select" name="type" className="p-2 border-[1px] w-full rounded-[12px]">
                                <option value="FIX">Fix</option>
                                <option value="PERCENTAGE">Percentage</option>
                            </Field>
                        </div>
                        <ErrorMessage name="type" component="div" className="text-darkpurplered text-[10px]" />
                        <p>Discount Seat Quantity</p>
                        <div>
                            <Field name="discount_quota" placeholder="Discount Quota" type="number" className="p-2 border-[1px] w-full rounded-[12px]" />
                            <ErrorMessage name="discount_quota" component="div" className="text-darkpurplered text-[12px]" />
                        </div>
                        <div className="flex flex-wrap items-center gap-5 rounded-[10px] border-[1px] justify-center p-2">
                            <p className="font-bold">Discounts that will be applied to the event </p>
                            <div>
                                <Field as="select" name="discount_event_event_id" className="p-2 border-[1px] rounded-[12px]">
                                    <option value="">Select Event</option>
                                    {
                                        dataEvent?.eventTotal.map((event) => (
                                            <option value={event.event_id}>{event.title}</option>
                                        ))
                                    }
                                </Field>
                                <ErrorMessage name="discount_event_event_id" component="div" className="text-darkpurplered text-[12px]" />
                            </div>
                        </div>
                        <p className="text-[12px]">Discount Session need Start and End date </p>
                        <div className="flex items-center gap-4">
                            <div>
                                <p>Starting Date</p>
                                <Field name="start_date" placeholder="Start Date" type="date" className="p-2 border-[1px] rounded-[12px]" />
                                <ErrorMessage name="start_date" component="div" className="text-darkpurplered text-[12px]" />
                            </div>
                            <div>
                                <p>Ended Date</p>
                                <Field name="end_date" placeholder="End Date" type="date" className="p-2 border-[1px] rounded-[12px]" />
                                <ErrorMessage name="end_date" component="div" className="text-darkpurplered text-[12px]" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <button type="submit" disabled={isSubmitting} className="bg-darkestblue p-2 rounded-[6px] w-1/4 text-white active:scale-95 duration-150 hover:bg-darkestblue/80 font-bold">Create Discount</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
