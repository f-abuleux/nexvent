import { convertDate, convertIdr } from "@/components/libs/action/converter"
import { schemaValidationReview } from "@/components/types/schema"
import { ICreateReviewEvent } from "@/components/types/types"
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik"
import Cookies from "js-cookie"

export default function AvailableEvent({name, price, date, location, description, event_id} : {name : string, price : number, date : string , location: string, description : string, event_id : string}){
    const token = Cookies.get("token")

    const initialValues: ICreateReviewEvent = {
        event_id: event_id,
        event_rating: 0,
        event_review: ""
    }

    const createReviewEvent = async (data: ICreateReviewEvent) => {
        try {
            const fetchData = await fetch('http://localhost:8000/api/review/create', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
        <Formik
            validationSchema={schemaValidationReview}
            initialValues={initialValues}
            onSubmit={(value, action) => {
                console.log(value)
                createReviewEvent(value)
                action.resetForm()
            }}
        >
            {({ setFieldValue }: FormikProps<ICreateReviewEvent>) => (
                <div>
                    <div className="w-full rounded-[12px] shadow-md bg-white justify-s flex flex-col gap-2 p-2 " >
                        <p className="font-medium text-[20px] text-center">{name}</p>
                    </div>
                    <div className="p-4 flex flex-col gap-1">
                        <p className="font-bold">{convertDate(date)}</p>
                        <p className="font-medium">{convertIdr(price)}</p>
                        <p>{location}</p>
                        <p>{description}</p>
                    </div>
                    <Form className="bg-white rounded-[12px] p-2">
                        <Field as="textarea" name="event_review" placeholder="Review description" className="p-2 w-full rounded-[10px]" />
                        <ErrorMessage name="event_review" component={'div'} className="text-darkpurplered text-[12px]" />
                        <div role="group" aria-labelledby="my-radio-group" className="flex gap-2 p-2 items-center">
                            <p>Rating for this event: </p>
                            <label className="flex gap-2 items-center">
                                <Field
                                    type="radio"
                                    name="event_rating"
                                    value="1"
                                    className="hidden peer"
                                />
                                <span className="font-medium text-[20px] bg-gray-200 w-14 h-14 item-center p-2 rounded-full peer-checked:bg-darkestblue text-center place-content-center peer-checked:text-white duration-200">
                                    1
                                </span>
                            </label>
                            <label className="flex gap-2 items-center">
                                <Field
                                    type="radio"
                                    name="event_rating"
                                    value="2"
                                    className="hidden peer"
                                />
                                <span className="font-medium text-[20px] bg-gray-200 w-14 h-14 item-center p-2 rounded-full peer-checked:bg-darkestblue text-center place-content-center peer-checked:text-white duration-200">
                                    2
                                </span>
                            </label>
                            <label className="flex gap-2 items-center">
                                <Field
                                    type="radio"
                                    name="event_rating"
                                    value="3"
                                    className="hidden peer"
                                />
                                <span className="font-medium text-[20px] bg-gray-200 w-14 h-14 item-center p-2 rounded-full peer-checked:bg-darkestblue text-center place-content-center peer-checked:text-white duration-200">
                                    3
                                </span>
                            </label>
                            <label className="flex gap-2 items-center">
                                <Field
                                    type="radio"
                                    name="event_rating"
                                    value="4"
                                    className="hidden peer"
                                />
                                <span className="font-medium text-[20px] bg-gray-200 w-14 h-14 item-center p-2 rounded-full peer-checked:bg-darkestblue text-center place-content-center peer-checked:text-white duration-200">
                                    4
                                </span>
                            </label>
                            <label className="flex gap-2 items-center">
                                <Field
                                    type="radio"
                                    name="event_rating"
                                    value="5"
                                    className="hidden peer"
                                />
                                <span className="font-medium text-[20px] bg-gray-200 w-14 h-14 item-center p-2 rounded-full peer-checked:bg-darkestblue text-center place-content-center peer-checked:text-white duration-200">
                                    5
                                </span>
                            </label>
                        </div>

                        <ErrorMessage name="event_rating" component={'div'} className="text-darkpurplered text-[12px]" />
                        <div className="w-full flex items-center justify-center">
                            <button type="submit" className="p-2 bg-darkestblue rounded-[10px] text-white" >Submit Review</button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    </div>
    )
}