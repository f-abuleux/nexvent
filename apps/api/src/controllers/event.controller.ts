import prisma from "@/prisma"
import { Request, Response } from "express"

const baseUrl = process.env.BASE_URL_API

export class EventController {
    async createEvent(req: Request, res: Response) {
        try {
            const user = await prisma.user.findUnique({
                where: { user_id: req.user?.user_id }
            })

            if (!user) throw "User not found to access creating event api"

            const image = `${baseUrl}/public/event/${req.file?.filename}`

            const creatingEvent = await prisma.event.create({
                data: {
                    title: req.body.title,
                    description: req.body.description,
                    image: image,
                    date: req.body.date,
                    quantity: +req.body.quantity,
                    location: req.body.location,
                    user_id: user.user_id,
                    price: +req.body.price,
                    eventCategoryCategory_name: req.body.category,
                }
            })

            return res.status(201).send({
                status: "Success",
                res: 201,
                msg: "Event successfully created",
                creatingEvent
            })

        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res: 400,
                msg: "Failed createEvent API"
            })
        }
    }

    async getEventByAdmin(req: Request, res: Response) {
        try {
            const { page = 1 } = req.query;
            const limit = 5;
            const offset = (Number(page) - 1) * limit;

            let eventTotal;
            if (req.query.page) {
                eventTotal = await prisma.event.findMany({
                    where: { user_id: req.user?.user_id },
                    orderBy: {
                        date : "desc"
                    },
                    skip: offset,
                    take: limit
                });
            } else {
                eventTotal = await prisma.event.findMany({
                    where: { user_id: req.user?.user_id },
                    orderBy: {
                        date : "desc"
                    },
                });
            }

            const calculateEvent = await prisma.event.count({
                where: { user_id: req.user?.user_id }
            });
            const totalPage = Math.ceil(calculateEvent / limit);

            const eventPass = await prisma.event.findMany({
                where: {
                    user_id: req.user?.user_id,
                    date: {
                        lt: new Date()
                    }
                }
            })

            const eventOnGoing = await prisma.event.findMany({
                where: {
                    user_id: req.user?.user_id,
                    date: {
                        gt: new Date()
                    }
                }
            })

            return res.status(200).send({
                status: "Success",
                res: 200,
                msg: "Success to getEventByAdmin API",
                eventTotal,
                eventPass,
                eventOnGoing,
                totalPage
            })

        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res: 400,
                msg: "Failed to getEventByAdmin API"
            })
        }
    }

    async getEventDetail(req: Request, res : Response){
        try {
            const detailEvent = await prisma.event.findUnique({
                where: {event_id : req.params.event_id}
            })

            return res.status(200).send({
                status : "Success",
                res : 200,
                msg: "Success to access getEventDetails API",
                detailEvent
            })
        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res : 200,
                msg : "Failed to access getEventDetails API"
            })
        }
    }
}