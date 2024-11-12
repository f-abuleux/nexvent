import { EventController } from "@/controllers/event.controller";
import { uploader } from "@/helpers/uploader";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class EventRouter {
    private router : Router
    private eventController : EventController
    private authMiddleware : AuthMiddleware

    constructor() {
        this.eventController = new EventController()
        this.authMiddleware = new AuthMiddleware()
        this.router = Router()
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.get(`/detail/:event_id`, this.eventController.getEventDetail)
        this.router.get("/byid", this.authMiddleware.verifyToken, this.authMiddleware.checkAdmin, this.eventController.getEventByAdmin)
        this.router.post("/create", uploader("event", "/event").single("image"), this.authMiddleware.verifyToken, this.eventController.createEvent)
    }

    getRouter() : Router {
        return this.router
    }
}