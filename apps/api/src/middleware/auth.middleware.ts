
import { NextFunction, Request, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';


export class AuthMiddleware {
    verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');

            if (!token) throw 'Verification Failed';

            const decoded = decode(token)
            if (typeof decoded !== 'string' && decoded && decoded.verified == false) throw "Your account not verified yet"

            const user = verify(token, process.env.SECRET_KEY!);
            req.user = user as User;

            next()
        } catch (error) {
            return res.status(400).send({
                status: "Error",
                res: 400,
                msg: "Failed to verify token mamen"
            })
        }
    }

    checkRole(role: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const token = req.headers.authorization?.replace('Bearer ', '');

                if (!token) throw 'Verification Failed';
                const decoded = decode(token);
                if (typeof decoded !== 'string' && decoded && decoded.role === role) {
                    next();
                } else {
                    throw `You Are Not Authorized! Required role: ${role}`;
                }
            } catch (error) {
                return res.status(400).send({
                    status: "Error",
                    res: 400,
                    msg: "Failed to check role"
                })
            }
        };
    }

    checkAdmin = this.checkRole("ADMIN");
    checkUser = this.checkRole("USER")
}
