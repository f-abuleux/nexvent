import prisma from "@/prisma";
import { Request, response, Response } from "express";

export class DiscountController {
    async createDiscount(req: Request, res: Response) {
        try {
            const double = await prisma.discount.findFirst({
                where: {
                    discount_code: req.body.discount_code
                }
            })

            if (double) throw "Discount code already taken"

            const createDiscount = await prisma.discount.create({
                data: {
                    discount_code: req.body.discount_code,
                    discount_value: req.body.discount_value,
                    discount_quota: req.body.discount_quota,
                    discount_event_event_id: req.body.discount_event_event_id,
                    type: req.body.type,
                    start_date: req.body.start_date,
                    end_date: req.body.end_date,
                }
            })

            return res.status(201).send({
                status: "Success",
                res: 201,
                msg: "Success creating discount",
                createDiscount
            })
        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res: 200,
                msg: "Failed to access createdDiscount API"
            })
        }
    }

    async getDiscountByAdmin(req: Request, res: Response) {
        try {
            const { page = 1 } = req.query;
            const limit = 5;
            const offset = (Number(page) - 1) * limit;
            let discountTotal;

            const user = await prisma.event.findMany({
                where: { user_id: req.user?.user_id },
            })

            if (req.query.page) {
                discountTotal = await prisma.discount.findMany({
                    where: {
                        discount_event_event_id: {
                            in: user.map(event => event.event_id)
                        }
                    },
                    skip: offset,
                    take: limit,
                    include: {
                        discount_event: true
                    }
                })
            } else {
                discountTotal = await prisma.discount.findMany({
                    where: {
                        discount_event_event_id: {
                            in: user.map(event => event.event_id)
                        }
                    }, include: {
                        discount_event: true
                    }
                })
            }

            const calculateDiscount = await prisma.discount.count({
                where: {
                    discount_event_event_id: {
                        in: user.map(event => event.event_id)
                    }
                }
            })

            const totalPage = Math.ceil(calculateDiscount / limit)

            const discountPass = await prisma.discount.findMany({
                where: {
                    discount_event_event_id: {
                        in: user.map(event => event.event_id)
                    }, end_date: {
                        lt: new Date()
                    }
                }
            })

            const discountOnGoing = await prisma.discount.findMany({
                where: {
                    discount_event_event_id: {
                        in: user.map(event => event.event_id)
                    }, end_date: {
                        gt: new Date()
                    }
                }
            })

            return res.status(200).send({
                status: "Success",
                res: 200,
                msg: "Success to acces getDiscountByAdmin API",
                discountTotal,
                discountPass,
                discountOnGoing,
                totalPage
            })

        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res: 400,
                msg: "Failed to acces getDiscountByAdmin API"
            })
        }
    }
}