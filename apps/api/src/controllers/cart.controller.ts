import prisma from "@/prisma";
import axios from "axios";
import { Request, Response } from "express";

export class CartController {
    async addCart(req: Request, res: Response) {
        try {
            if (!req.user?.user_id) {
                return res.status(401).json({ message: "User not authenticated" });
            }

            const user = await prisma.user.findFirst({
                where: {
                    user_id: req.user?.user_id
                }
            });

            if (!user) throw "User not found";
            await prisma.$transaction(async (prisma) => {
                const addtoCart = await prisma.cart.create({
                    data: {
                        user_id: req.user?.user_id as string,
                        event_id: req.params.event_id,
                        quantity: +req.body.quantity,
                        price: +req.body.price,
                        status_order : "INCART",
                        proofpayment: "",
                        paymentlink: "",
                        totalPrice: req.body.quantity * req.body.price,
                        discountDiscount_name: req.body.discountDiscount_name
                    }
                })
                if (!addtoCart.user_id) throw "Failed to accessing user details"
                if (!addtoCart.event_id) throw "Failed to get event id"

                if (addtoCart.discountDiscount_name) {
                    const findDiscount = await prisma.discount.findFirst({
                        where: {
                            discount_code: addtoCart.discountDiscount_name
                        }
                    })
                    if (!findDiscount) {
                        throw "Discount Not Found"
                    }

                    return res.status(200).send({
                        status: "Success",
                        res: 200,
                        msg: "Successfully add to Cart",
                        addtoCart,
                        findDiscount
                    })
                }
                return res.status(200).send({
                    status: "Success",
                    res: 200,
                    msg: "Successfully add to Cart & no diecount were applied",
                    addtoCart,
                })
            })
        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res: 400,
                msg: "Failed to access addCart API"
            })
        }
    }

    async getCartbyId(req: Request, res: Response) {
        try {
            const getCart = await prisma.cart.findMany({
                where: {
                    user_id: req.user?.user_id,
                }
            })

            const events = await Promise.all(getCart.map(async (cartItem) => {
                return await prisma.event.findUnique({
                    where: {
                        event_id: cartItem.event_id
                    }
                });
            }));

            return res.status(200).send({
                status: "Success",
                res: 200,
                msg: "Success to  access getCartbyId API",
                getCart,
                events
            })

        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res: 400,
                msg: "Failed to access getCartbyId API"
            })
        }
    }

    async createTransactionCart(req: Request, res : Response){
        try {
            if (!req.user?.user_id) {
                return res.status(401).send({ msg: "User not authenticated" });
            }

            const user = await prisma.user.findFirst({
                where: {
                    user_id: req.user?.user_id
                }
            });

            if (!user) throw "User not found";

            await prisma.$transaction(async (prisma)=> {
                const createTransactionCart = await prisma.cart.create({
                    data: {
                        user_id: req.user?.user_id as string,
                        event_id: req.params.event_id,
                        quantity: +req.body.quantity,
                        price: +req.body.price,
                        status_order : "PENDING",
                        proofpayment: "",
                        paymentlink: "",
                        totalPrice: req.body.quantity * req.body.price,
                    }
                })
                if (!createTransactionCart.user_id) throw "Failed to accessing user details"
                if (!createTransactionCart.event_id) throw "Failed to get event id"

                let data = {
                    transaction_details: {
                        order_id: createTransactionCart.cart_id,
                        gross_amount: createTransactionCart.totalPrice
                    },
                    expiry: {
                        unit: "minutes",
                        duration: 5
                    }
                };

                try {
                    const midTrans = await axios.post("https://app.sandbox.midtrans.com/snap/v1/transactions", data, {
                        headers: {
                            Authorization: "Basic U0ItTWlkLXNlcnZlci0wX3B6VFUteWtBTlllVi1RZ1QzZG42Z3g6"
                        }
                    });

                    const midTransData = await midTrans.data;

                    await prisma.cart.update({
                        data: {
                            paymentlink: midTransData.redirect_url
                        },
                        where: {
                            cart_id: createTransactionCart.cart_id
                        }
                    });

                    return res.status(200).send({
                        status: "Success",
                        res: 200,
                        msg: "Success create order",
                        createTransactionCart,
                        midTransData
                    });

                } catch (error) {
                    throw new Error((error as any).response?.data || "An error occurred with Midtrans");
                }
            });
        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res : 400,
                msg: "Failed accessing createTransactionCart API"
            })
        }
    }

    async updateStatusOrderCart(req: Request, res: Response) {
        try {
            const { transaction_status, cart_id } = req.body;
        if (transaction_status == "settlement") {
            await prisma.cart.update({
                where: {
                    cart_id: +cart_id
                },
                data: {
                    status_order: "PAID"
                },
            });

            const cartItems = await prisma.cart.findMany({
                where: {
                    cart_id: +cart_id
                }
            });

            return res.status(200).send({
                status: "Success",
                msg: `Order status updated to PAID and event stock adjusted for `,
                
            });
        }

            if (transaction_status == "cancel") {
                await prisma.cart.update({
                    where: {
                        cart_id: +cart_id
                    },
                    data: {
                        status_order: "CANCEL"
                    },
                })
            }

            if (transaction_status == "expire") {
                await prisma.cart.update({
                    where: {
                        cart_id: +cart_id
                    },
                    data: {
                        status_order: "CANCEL"
                    },
                })
            }

            return res.status(200).send({
                status: "Success update status transaction",
                msg: "Transaction data has been updated",
            })
        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res: 200,
                msg: "Failed to access updateStatusOrder API"
            })
        }
    }
}