'use client'

import { createEventSchema } from "@/components/types/schema";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useState, ChangeEvent, useEffect } from "react";
import { toast } from 'react-toastify';
import ImagePreviewProduct from "./imagePreview";
import { FaFileUpload } from "react-icons/fa";
import Cookies from "js-cookie";
import { formatDate } from "@/components/libs/action/converter";
import { useRouter } from "next/navigation";
import { ICreateEvent } from "@/components/types/types";

interface ICategory {
    category_id: number,
    name: string
}

export default function FormCreateEvent() {
    const [image, setImage] = useState<File[]>([]);
    const [category, setCategory] = useState<ICategory[]>([])

    const getCategoryData = async () => {
        try {
            const category = await fetch('http://localhost:8000/api/category', {
                method: "GET"
            })

            if (!category) throw "Failed to get category"

            const categoryData = await category.json()

            setCategory(categoryData.category)

        } catch (error) {
            console.log(error)
        }
    }

    console.log(category)

    useEffect(() => {
        getCategoryData()
    }, [])

    const initialValues: ICreateEvent = {
        title: "",
        description: "",
        date: "",
        quantity: "",
        price: "",
        location: "",
        category: "",
        image: null
    };


    const token = Cookies.get("token")
    const router = useRouter()

    const createEvent = async (data: ICreateEvent, actions: FormikHelpers<ICreateEvent>) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("date", formatDate(data.date));
        formData.append("quantity", data.quantity);
        formData.append("price", data.price.toString());
        formData.append("location", data.location);
        formData.append("category", data.category)
        if (data.image) {
            formData.append("image", data.image);
        }

        console.log("FormData entries:", Array.from(formData.entries()));

        try {
            const res = await fetch('http://localhost:8000/api/event/create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            if (!res.ok) throw new Error("Failed to create event");

            const result = await res.json();
            console.log("Server Response:", result);
            console.log("Form Data submitted:", data);
            actions.resetForm();
            setTimeout(() => {
                router.refresh()
            }, 5000)
            setImage([]);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
        if (e.target.files) {
            const newFile = Array.from(e.target.files);
            const maxFileSize = 1 * 1024 * 1024;
            const filterSize = newFile.filter((file) => {
                if (file.size > maxFileSize) {
                    toast.error("Maximum file size is 1MB");
                    return false;
                }
                return true;
            });
            setImage(filterSize);
            setFieldValue("image", filterSize[0] || null);
        }
    };



    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={createEventSchema}
                onSubmit={(values, actions) => {
                    console.log("Submitting form with values:", values);
                    createEvent(values, actions);
                    setTimeout(() => {
                        router.refresh()
                    }, 5000)
                }}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="flex flex-col gap-5 p-4">
                        <p>Event Name :</p>
                        <div className="w-full ">
                            <Field type="text" name="title" placeholder="Title" className="p-2 border-[1px] w-full rounded-[12px]" />
                            <ErrorMessage name="title" component="div" className="text-darkpurplered text-[12px]" />
                        </div >
                        <p>Event Description : </p>
                        <div className="w-full ">
                            <Field as="textarea" name="description" placeholder="Description" className="p-2 border-[1px] w-full rounded-[12px]" />
                            <ErrorMessage name="description" component="div" className="text-darkpurplered text-[12px]" />
                        </div>
                        <div className="flex gap-2 items-center">
                            <p>Event Date :</p>
                            <div className="flex flex-col justify-start">
                                <Field type="date" name="date" placeholder="Date" className="p-2 border-[1px] rounded-[12px]" />
                                <ErrorMessage name="date" component="div" className="text-darkpurplered text-[12px]" />
                            </div>
                            <p>Ticket Price :</p>
                            <div className="flex flex-col justify-start">
                                <Field type="number" name="price" placeholder="Price" className="p-2 border-[1px] rounded-[12px] w-[150px]" />
                                <ErrorMessage name="price" component="div" className="text-darkpurplered text-[12px]" />
                            </div>
                            <p>Seat : </p>
                            <div>
                                <Field type="number" name="quantity" placeholder="Total Seat" className="p-2 border-[1px] rounded-[12px] w-[125px]" />
                                <ErrorMessage name="quantity" component="div" className="text-darkpurplered text-[12px]" />
                            </div>
                            <p>Category :</p>
                            <div>
                                <Field as="select" name="category" className="p-2 border-[1px] rounded-[12px]">
                                    <option value="">Select Category</option>
                                    {category.map((cat) => (
                                        <option key={cat.category_id} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="category" component="div" className="text-darkpurplered text-[12px]" />
                            </div>
                        </div>
                        <p>Location/Address :</p>
                        <div className="w-full " >
                            <Field type="text" name="location" placeholder="Location" className="p-2 border-[1px] w-full rounded-[12px]" />
                            <ErrorMessage name="location" component="div" className="text-darkpurplered text-[12px]" />
                        </div>
                        <p>Pick your Event's Banner</p>
                        <div className="flex flex-col items-start gap-2">
                            <ImagePreviewProduct files={image} setSelectedFiles={setImage} />
                            <label htmlFor="image" className="flex items-center gap-2 cursor-pointer bg-darkestblue text-white px-4 py-2 rounded-md">
                                <FaFileUpload size={14} />
                                <p>
                                    {
                                        image.length === 0 ? "Choose File " : "Change File"
                                    }
                                </p>
                            </label>
                            <input
                                onChange={(e) => handleFileChange(e, setFieldValue)}
                                type="file"
                                id="image"
                                name="image"
                                max={1}
                                className="hidden"
                            />
                            <ErrorMessage name="image" component="div" className="text-darkpurplered text-[12px]" />
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" disabled={isSubmitting} className="bg-darkestblue p-2 rounded-[6px] w-1/4 text-white active:scale-95 duration-150 hover:bg-darkestblue/80 font-bold">CREATE EVENT</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
