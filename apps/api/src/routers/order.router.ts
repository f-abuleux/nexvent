// import { OrderController } from "@/controllers/order.controller";
// import { AuthMiddleware } from "@/middleware/auth.middleware";
// import { Router } from "express";

// export class OrderRouter{
//     private router : Router;
//     private orderController : OrderController;
//     private authMiddleware : AuthMiddleware;

//     constructor(){
//         this.router = Router()
//         this.orderController = new OrderController()
//         this.authMiddleware = new AuthMiddleware()
//         this.initializeRouter()
//     }

//     private initializeRouter(){
//         this.router.post('/create', this.authMiddleware.verifyToken, this.orderController.createOrder)
//         this.router.post('/update/status', this.orderController.updateStatusOrder)
//     }

//     getRouter(): Router {
//         return this.router
//     }
// }