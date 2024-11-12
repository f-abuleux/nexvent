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
        
    }

    getRouter(): Router {
        return this.router
    }
}