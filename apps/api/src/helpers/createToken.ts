import {sign, verify} from "jsonwebtoken"

export interface IPayload {
    user_id: string,
    role : string,
    verified : boolean
    email: string
    first_name : string
}

const key = process.env.SECRET_KEY;

if (!key) {
    throw new Error("SECRET_KEY is not defined");
}

export const usingToken = (payload: IPayload, expiresIn: string)  => {
    try {
        const token = sign(payload, key, { expiresIn: expiresIn });
        return token
    } catch (error) {
        console.log("Error creating token", error)
        throw new Error("Error creating token")
    }
}

