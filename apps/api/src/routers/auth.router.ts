import { AuthController } from "@/controllers/auth.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class AuthRouter{
    private router : Router
    private authController : AuthController
    private authMiddleware : AuthMiddleware
    

    constructor(){
        this.authController = new AuthController()
        this.authMiddleware = new AuthMiddleware()
        this.router = Router()
        this.initialization()
    }

    private initialization()  {
        this.router.get('/user', this.authMiddleware.verifyToken, this.authController.getUser)
        this.router.post("/createuser", this.authController.createUser)
        this.router.post("/loginuser", this.authController.loginUser)
        this.router.patch(`/verifyinguser/:token`, this.authController.verificationUser)
    }

    getRouter() : Router {
        return this.router
    }
}