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
        this.router.get("/byevent", this.authMiddleware.verifyToken, this.reviewController.getReviewbyEvent)
        this.router.post("/create", this.authMiddleware.verifyToken, this.reviewController.createReviewEvent )
    }

    getRouter() : Router {
        return this.router
    }
}