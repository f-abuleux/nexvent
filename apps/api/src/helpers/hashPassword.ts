import { genSalt, hash } from "bcrypt";

export const hashPassword = async (password : string) => {
    const salt = await genSalt(10)
    const hashPassword = await hash(password, salt)
    return hashPassword
}  