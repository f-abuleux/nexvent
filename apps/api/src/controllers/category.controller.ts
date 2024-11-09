import prisma from "@/prisma";
import { Request, Response } from "express";

export class CategoryController{
    async getAllCategory(req: Request, res : Response){
        try {
            const category = await prisma.eventCategory.findMany({})
            return res.status(200).send({
                status : "Success",
                res : 200,
                msg : "Success access getAllCategory API",
                category
            })
        } catch (error) {
            return res.status(400).send({
                status : "Failed",
                res : 400,
                msg: "Failed to access getAllCategory API"
            })
        }
    }
}