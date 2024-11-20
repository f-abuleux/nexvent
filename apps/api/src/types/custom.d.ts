type User = {
    user_id: string
    role: string
    email: string
    first_name : string
    verified: boolean
}

declare namespace Express {
    export interface Request {
        user?: User
        file?: Multer.File;
    }
}

