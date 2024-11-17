import { ReviewController } from "@/controllers/review.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class ReviewRouter {
    private router : Router
    private authMiddleware : AuthMiddleware
    private reviewController : ReviewController

    constructor() {
        this.authMiddleware = new AuthMiddleware()
        this.reviewController = new ReviewController()
        this.router = Router()
        this.initializeRouter()
    }

    private initializeRouter () {

    }

    getRouter() : Router {
        return this.router
    }
}