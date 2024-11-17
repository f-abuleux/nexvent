'use client';

import { convertPrice } from "@/components/converter";
import { validationSchemaAddToCart } from "@/components/schema";
import { IAddToCart } from "@/components/types/types";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { useState } from "react";
import { IoMdAdd, IoMdRemove, IoMdShare } from "react-icons/io";
import * as yup from "yup";



export default function QuantityAndNotes({ eventquantity, eventprice }: { eventquantity: number, eventprice: number }) {
    const [quantity, setQuantity] = useState(0);
    const totalPrice = quantity * eventprice;
    const token = Cookies.get("token");
    const params = useParams();

    const initialValues: IAddToCart = {
        event_id: params.id.toString(),
        quantity: quantity,
        price: totalPrice,
    };

    const addToCart = async (values: IAddToCart) => {
        try {
            const postToCart = await fetch('http://localhost:8000/api/cart/create', {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!postToCart.ok) throw new Error("Failed adding event to cart");
            const result = await postToCart.json();
            console.log("Added to cart:", result);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchemaAddToCart}
            onSubmit={(values, action) => {
                addToCart(values);
                console.log("Submitted values:", values);
                action.resetForm();
                setQuantity(0)
            }}
        >
            {({ setFieldValue, handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="bg-white w-72 h-[700px] bg-white/40 shadow-md rounded-[12px] p-4 gap-5 flex flex-col items-center">
                    <p className="bg-white p-2 rounded-[6px] w-full text-center font-medium shadow-md">SET QUANTITY AND NOTES</p>
                    <div className="flex flex-col justify-start w-full gap-4">
                        <p className="text-left">QUANTITY</p>
                        <input
                            type="number"
                            className="p-2 rounded-[6px] text-center"
                            value={quantity}
                            min="0"
                            max={eventquantity}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                if(value !== 0) {
                                    setQuantity(value);
                                    setFieldValue("quantity", value);
                                    setFieldValue("price", value * eventprice);
                                    
                                } return 
                            }}
                        />
                        <div className="w-full flex justify-around items-center gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    if (quantity < eventquantity) {
                                        setQuantity(quantity + 1);
                                        setFieldValue("quantity", quantity + 1);
                                        setFieldValue("price", (quantity + 1) * eventprice);
                                    }
                                }}
                                className="bg-white w-1/2 p-2 rounded-[6px] flex gap-2 items-center font-medium">
                                <IoMdAdd />
                                <p>Increase</p>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (quantity > 0) {
                                        setQuantity(quantity - 1);
                                        setFieldValue("quantity", quantity - 1);
                                        setFieldValue("price", (quantity - 1) * eventprice);
                                    }
                                }}
                                className="bg-white w-1/2 p-2 rounded-[6px] flex gap-2 items-center font-medium"
                            >
                                <IoMdRemove />
                                <p>Decrease</p>
                            </button>
                        </div>
                        <p className="text-[12px]">Quantity can only be added up to <span className="font-black">{eventquantity}</span> below availability</p>
                        <p className="text-left font-bold text-[16px]">TICKET PRICE</p>
                        <p className="text-left">{convertPrice(eventprice)}</p>
                        <input
                            type="text"
                            name="note"
                            className="p-2 rounded-[6px] text-center"
                            placeholder="Add Notes (Optional)"
                        />
                        <button className="bg-white w-full p-2 rounded-[6px]  items-center font-medium text-center"> <p>Apply Code</p></button>
                        <p className="text-left font-bold text-[16px]">TOTAL PRICE</p>
                        <p className="text-left">{convertPrice(totalPrice)}</p>
                        <button type="submit" className="p-2 border-white border-[1px] bg-white/20 rounded-[6px] font-bold">Add To Cart</button>
                        <button type="button" className="p-2 border-white bg-white rounded-[6px] font-bold">Checkout</button>
                        <div className="flex items-center justify-center gap-4">
                            <div className="flex gap-2 items-center">
                                <IoMdShare size={16} />
                                <p className="font-bold text-[12px]">Share</p>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
