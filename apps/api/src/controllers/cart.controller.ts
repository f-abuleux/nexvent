import prisma from "@/prisma";
import { status_order } from "@prisma/client";
import axios from "axios";
import { Request, Response } from "express";

export class CartController {
    async addCart(req: Request, res: Response) {
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
            await prisma.$transaction(async (prisma) => {
                const addtoCart = await prisma.cart.create({
                    data: {
                        user_id: req.user?.user_id as string,
                        event_id: req.body.event_id,
                        quantity: +req.body.quantity,
                        price: +req.body.price,
                        status_order: "INCART",
                        proofpayment: "",
                        paymentlink: "",
                        totalPrice: req.body.price,
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

    async getTransactionbyId(req: Request, res: Response) {
        try {
            const { page = 1 } = req.query
            const limit = 5
            const offset = (+page - 1) * limit

            const cart = await prisma.cart.findMany({
                where: {
                    user_id: req.user?.user_id,
                },
                skip: offset,
                take: limit,
                orderBy : {
                    updated_at : "desc"
                },
                include : {
                    Event : true
                }
            })

            const totalTransaction = await prisma.cart.count({
                where: {
                    user_id: req.user?.user_id
                }
            })

            const totalPage = Math.ceil(totalTransaction / limit)

            return res.status(200).send({
                status: "Success",
                res: 200,
                msg: "Success accessing getTransacionbyId API",
                totalTransaction,
                totalPage,
                cart,
            })

        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res: 400,
                msg: "Failed access getTransactionbyId API",
            })
        }
    }

    async getCartbyId(req: Request, res: Response) {
        try {
            const { incart, pending, paid, cancel } = req.query;

            let statusOrder: status_order | undefined;

            if (incart === "true") {
                statusOrder = status_order.INCART;
            } else if (pending === "true") {
                statusOrder = status_order.PENDING;
            } else if (paid === "true") {
                statusOrder = status_order.PAID;
            } else if (cancel === "true") {
                statusOrder = status_order.CANCEL;
            }

            const getCart = await prisma.cart.findMany({
                where: {
                    user_id: req.user?.user_id,
                    ...(statusOrder ? { status_order: statusOrder } : {}),
                },
            });

            const events = await Promise.all(
                getCart.map(async (cartItem) => {
                    return await prisma.event.findUnique({
                        where: {
                            event_id: cartItem.event_id,
                        },
                    });
                })
            );

            return res.status(200).send({
                status: "Success",
                res: 200,
                msg: "Success to access getCartbyId API",
                getCart,
                events,
            });
        } catch (error) {
            console.error("Error in getCartbyId:", error);
            return res.status(400).send({
                status: "Failed",
                res: 400,
                msg: "Failed to access getCartbyId API",
            });
        }
    }

    async createTransactionCart(req: Request, res: Response) {
        try {
            if (!req.user?.user_id) {
                return res.status(401).send({
                    msg: "User not authenticated"
                });
            }

            const user = await prisma.user.findFirst({
                where: {
                    user_id: req.user?.user_id
                }
            });

            if (!user) throw "User not found";

            await prisma.$transaction(async (prisma) => {
                const findCart = await prisma.cart.findFirst({
                    where: {
                        cart_id: req.params.cart_id
                    }
                })

                const createTransactionCart = await prisma.cart.update({
                    where: {
                        cart_id: findCart?.cart_id,
                    },
                    data: {
                        status_order: "PENDING",
                        proofpayment: "",
                        paymentlink: "",
                    }
                })
                // if (!createTransactionCart.user_id) throw "Failed to accessing user details"
                // if (!createTransactionCart.event_id) throw "Failed to get event id"

                let data = {
                    transaction_details: {
                        order_id: createTransactionCart.cart_id.toString(),
                        gross_amount: findCart?.totalPrice
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

                    if (!midTransData) throw "ERROR MID TRANS DATA"

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
                res: 400,
                msg: "Failed accessing createTransactionCart API"
            })
        }
    }

    async updateStatusOrderCart(req: Request, res: Response) {
        try {
            const { transaction_status, order_id } = req.body;
            if (transaction_status == "settlement") {
                const cart = await prisma.cart.update({
                    where: {
                        cart_id: order_id
                    },
                    data: {
                        status_order: "PAID",
                    },
                });

                const quantityUpdate = await prisma.event.update({
                    where: {
                        event_id: cart.event_id
                    }, data: {
                        quantity: {
                            decrement: +cart.quantity
                        }
                    }
                })

                const cartItems = await prisma.cart.findMany({
                    where: {
                        cart_id: order_id
                    }
                });

                return res.status(200).send({
                    status: "Success",
                    msg: `Order status updated to PAID and event stock adjusted for `,
                    quantityUpdate
                });
            }


            if (transaction_status == "cancel") {
                await prisma.cart.update({
                    where: {
                        cart_id: order_id
                    },
                    data: {
                        status_order: "CANCEL"
                    },
                })
            }

            if (transaction_status == "expire") {
                await prisma.cart.update({
                    where: {
                        cart_id: order_id
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

    async deleteCart(req: Request, res: Response) {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    user_id: req.user?.user_id
                }
            })

            if (!user) throw "User not find"

            const deleteCart = await prisma.cart.delete({
                where: {
                    cart_id: req.params.cart_id
                }
            })

            return res.status(200).send({
                status: "Success",
                res: 200,
                msg: "Success accessing deleteCart API",
                deleteCart
            })
        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res: 400,
                msg: "Failed to access deleteCart API"
            })
        }
    }
}