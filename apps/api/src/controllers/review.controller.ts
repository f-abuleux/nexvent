import prisma from "@/prisma";
import { Request, Response } from "express";

export class ReviewController {
    async createReviewEvent(req: Request, res: Response) {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    user_id: req.user?.user_id
                }
            })

            console.log("User:", user);

            if (!user) throw "User not Found"

            const event = await prisma.event.findFirst({
                where: {
                    event_id: req.body.event_id
                }
            })

            if (event && event?.date > new Date()) throw "Event still ongoing cannot review until the event finish"

            const createReviewEvent = await prisma.reviewEvent.create({
                data: {
                    user_id: user.user_id as string,
                    event_id: event?.event_id as string,
                    event_rating: +req.body.event_rating,
                    event_review: req.body.event_review
                }
            })

            return res.status(201).send({
                status: "Success",
                res: 201,
                msg: "Success access createReviewEvent API",
                createReviewEvent
            })

        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res: 400,
                msg: "Failed to access createReviewEvent API"
            })
        }
    }

    async getReviewbyEvent(req: Request, res: Response) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    user_id: req.user?.user_id
                }
            });
    
            if (!user) throw new Error("User not found");

            const paidCarts = await prisma.cart.findMany({
                where: {
                    user_id: user.user_id,
                    status_order: "PAID",
                    Event: {
                        date: {
                            lt: new Date()
                        }
                    }
                },
                include: {
                    Event: true
                }
            });

            const paidEventIds = paidCarts.map(cart => cart.event_id);
    
            const reviewedEvents = await prisma.reviewEvent.findMany({
                where: {
                    user_id: user.user_id,
                    event_id: { in: paidEventIds } 
                },
                select: {
                    event_id: true
                }
            });
    
            const reviewedEventIds = reviewedEvents.map(review => review.event_id);

            const reviewedData = await prisma.reviewEvent.findMany({
                where : {
                    user_id : req.user?.user_id,
                    event_id: { in: reviewedEventIds }
                }, include : {
                    Event : true
                }
            })

            const availableToReview = paidCarts.filter(cart => 
                !reviewedEventIds.includes(cart.event_id)
            );
    
            return res.status(200).send({
                status: "Success",
                res: 200,
                msg: "Success accessing getReviewbyEvent API",
                availableToReview,
                availableToReviewLength: availableToReview.length,
                reviewedEventIds,
                reviewedData
            });
        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res: 400,
                msg: error instanceof Error ? error.message : "Failed to access getReviewbyEvent API"
            });
        }
    }
}