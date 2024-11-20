"use client"

import SidebarUser from "@/components/sidebar-user";
import { IAvailableReview, ICreateReviewEvent } from "@/components/types/types";
import { values } from "cypress/types/lodash";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import * as yup from "yup";
import AvailableEvent from "./_components/availableevent";
import UnavailableEvent from "./_components/unavailableevent";




export default function ReviewEvent() {
    const token = Cookies.get("token")
    const [dataEvent, setDataEvent] = useState<IAvailableReview>()


    const fetchDataEvent = async () => {
        try {
            const fetchData = await fetch('http://localhost:8000/api/review/byevent', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await fetchData.json()
            setDataEvent(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDataEvent()
    }, [])

    console.log(dataEvent)

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
                                <p className="font-medium text-[20px] text-center">Review</p>
                            </div>
                            <div className="p-4 text-[12px] flex flex-col gap-1">
                                <p >Every completed event can be reviewed and rated, the event will appear in the menu below</p>
                                <p >Each account can only give 1 review for 1 event that has been purchased and has passed, regardless of whether multiple tickets have been purchased.</p>
                                <p> Please note that feedback that has been submitted cannot be edited or deleted. Please review your feedback carefully before submitting.</p>
                            </div>
                            <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                                <p className="font-medium text-[20px] text-center">Give some Feedback</p>
                            </div>
                            {
                                !dataEvent?.availableToReview || dataEvent.availableToReview.length < 1 ? (
                                    <div className="w-full justify-center items-center text-center">
                                        <p className="font-roman">PURCHASE SOME EVENT</p>
                                    </div>
                                ) : (
                                    dataEvent.availableToReview.map((event, index) => {
                                        if (index > 0 && event.Event.event_id === dataEvent.availableToReview[index - 1].Event.event_id) {
                                            return null;
                                        }
                                        return (
                                            <div key={index}>
                                                <AvailableEvent name={event.Event.title} price={event.Event.price} location={event.Event.location} description={event.Event.description} date={event.Event.date} event_id={event.Event.event_id} />
                                            </div>
                                        );
                                    })
                                )
                            }
                            <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-4 " >
                                <p className="font-medium text-[20px] text-center">Feedback collected</p>
                            </div>
                            {
                                !dataEvent?.reviewedData || dataEvent.reviewedData.length < 1 ? (
                                    <div className="w-full justify-center items-center text-center">
                                        <p className="font-roman">PURCHASE SOME EVENT</p>
                                    </div>
                                ) : (
                                    dataEvent && dataEvent.reviewedData.map((event, index) => {
                                        return (
                                            <div key={index}>
                                                <UnavailableEvent name={event.Event.title} price={event.Event.price} location={event.Event.location} description={event.Event.description} date={event.Event.date} rating={event.event_rating} review={event.event_review} />
                                            </div>
                                        )
                                    }))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}