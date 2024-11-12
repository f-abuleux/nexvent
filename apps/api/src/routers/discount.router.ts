import { DiscountController } from "@/controllers/discount.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class DiscountRouter{
    private router : Router
    private discountController : DiscountController
    private authMiddleware : AuthMiddleware
    
    constructor(){
        this.discountController = new DiscountController()
        this.authMiddleware = new AuthMiddleware()
        this.router = Router()
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.post('/create', this.authMiddleware.verifyToken, this.discountController.createDiscount)
        this.router.get('/byid', this.authMiddleware.verifyToken, this.discountController.getDiscountByAdmin)
    }

    getRouter(): Router {
        return this.router
    }
}