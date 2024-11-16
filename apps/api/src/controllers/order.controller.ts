import prisma from "@/prisma";
import axios from "axios";
import { Request, Response } from "express";

export class OrderController {
    async createOrder(req: Request, res: Response) {
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
                const order = await prisma.order.create({
                    data: {
                        user_id: user?.user_id,
                        total: req.body.total,
                        proofpayment: "",
                        paymentlink: "",
                        Cart : req.body.cart
                    }
                });

                let data = {
                    transaction_details: {
                        order_id: order.order_id,
                        gross_amount: order.total
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

                    await prisma.order.update({
                        data: {
                            paymentlink: midTransData.redirect_url
                        },
                        where: {
                            order_id: order.order_id
                        }
                    });

                    return res.status(200).send({
                        status: "Success",
                        res: 200,
                        msg: "Success create order",
                        order,
                        midTransData
                    });

                } catch (error) {
                    throw new Error((error as any).response?.data || "An error occurred with Midtrans");
                }
            });


        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res: 400,
                msg: "Failed to access CreateOrder API"
            })
        }
    }

    async updateStatusOrder(req: Request, res: Response) {
        try {
            const { transaction_status, order_id } = req.body;
        if (transaction_status == "settlement") {
            await prisma.order.update({
                where: {
                    order_id: +order_id
                },
                data: {
                    status_order: "PAID"
                },
            });

            const cartItems = await prisma.cart.findMany({
                where: {
                    order_id: +order_id
                }
            });

            // for (const item of cartItems) {
            //     await prisma.event.update({
            //         where: {
            //             event_id: item.event_id
            //         },
            //         data: {
            //             quantity: {
            //                 decrement: item.quantity
            //             }
            //         }
            //     });
            //     console.log(item.quantity)
            //     console.log(item.quantity)
            //     console.log(item.quantity)
            //     res.status(200).send({
            //         msg :`Order status updated to PAID and event stock adjusted for ${item.event_id}, ${item.quantity}`
            //     })
            // }

            return res.status(200).send({
                status: "Success",
                msg: `Order status updated to PAID and event stock adjusted for `,
                
            });
        }

            if (transaction_status == "cancel") {
                await prisma.order.update({
                    where: {
                        order_id: +order_id
                    },
                    data: {
                        status_order: "CANCEL"
                    },
                })
            }

            if (transaction_status == "expire") {
                await prisma.order.update({
                    where: {
                        order_id: +order_id
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