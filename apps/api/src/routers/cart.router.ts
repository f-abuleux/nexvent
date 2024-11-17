import { CartController } from "@/controllers/cart.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class CartRouter{
    private router : Router;
    private cartController : CartController
    private authMiddleware : AuthMiddleware

    constructor(){
        this.cartController = new CartController()
        this.authMiddleware = new AuthMiddleware()
        this.router = Router()
        this.initializeRouter()
    }

    private initializeRouter() {
        this.router.get("/byid", this.authMiddleware.verifyToken, this.cartController.getCartbyId)
        this.router.get("/byid/transaction", this.authMiddleware.verifyToken, this.cartController.getTransactionbyId)
        this.router.post(`/create`, this.authMiddleware.verifyToken, this.authMiddleware.checkUser, this.cartController.addCart)
        this.router.post(`/create/transaction/:cart_id`, this.authMiddleware.verifyToken, this.cartController.createTransactionCart)
        this.router.post('/update/status', this.cartController.updateStatusOrderCart)
        this.router.delete(`/delete/transaction/:cart_id`, this.authMiddleware.verifyToken, this.cartController.deleteCart)
    }

    getRouter(): Router {
        return this.router
    }
}