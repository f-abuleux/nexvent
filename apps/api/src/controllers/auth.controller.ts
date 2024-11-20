import { usingToken } from "@/helpers/createToken";
import { hashPassword } from "@/helpers/hashPassword";
import { GenerateReferralCode } from "@/helpers/referralGenerator";
import prisma from "@/prisma";
import { Request, Response } from "express";
import fs from 'fs'
import path from 'path'
import handlebars from 'handlebars'
import { transporter } from "@/helpers/nodemailer";
import { verify } from "jsonwebtoken";
import { compare } from "bcrypt";

export class AuthController {
    async createUser(req: Request, res: Response) {
        try {
            const checkUser = await prisma.user.findFirst({
                where: {
                    OR: [{
                        email: req.body.email,
                        phone: req.body.phone,
                    }]
                }
            })

            if (checkUser?.email) throw "Email already use"
            if (checkUser?.phone) throw "Phone number already use"

            const hashedpassword = await hashPassword(req.body.password)

            const newUser = await prisma.user.create({
                data: {
                    email: req.body.email,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    password: hashedpassword,
                    role: req.body.role,
                    date_of_birth: req.body.date_of_birth,
                    phone: req.body.phone
                }
            })

            const token = usingToken({
                user_id: newUser.user_id,
                role: newUser.role,
                email: newUser.email,
                verified: newUser.verified,
                first_name: newUser.first_name
            }, "1h")

            console.log("TOKEN GENERATED", token)


            const templatePath = path.join(__dirname, '../templates', "verify.hbs")
            console.log("Template path:", templatePath);

            let templateSource;
            try {
                templateSource = fs.readFileSync(templatePath, 'utf-8');
                console.log("Template file read successfully");
            } catch (error) {
                console.error("Error reading template file:", error);
                return res.status(500).send({
                    status: 'Error',
                    res: 500,
                    msg: 'Error reading email template'
                });
            }

            let html;
            try {
                const compiledTemplate = handlebars.compile(templateSource);
                html = compiledTemplate({
                    link: `${process.env.BASE_URL_FRONTEND}/verification/${token}`,
                });
                console.log("Template compiled and HTML generated successfully");
            } catch (error) {
                console.error("Error compiling template:", error);
                return res.status(500).send({
                    status: 'Error',
                    res: 500,
                    msg: 'Error compiling email template'
                });
            }

            try {
                await transporter.sendMail({
                    from: process.env.MAIL_USER,
                    to: req.body.email,
                    subject: 'Welcome to NexVent',
                    html,
                });
                console.log("Email sent successfully");
            } catch (error) {
                console.error("Error sending email:", error);
                return res.status(500).send({
                    status: 'Error',
                    res: 500,
                    msg: 'Error sending email'
                });
            }
            console.log("Email sent successfully");

            return res.status(201).send({
                status: "Succces",
                res: 201,
                msg: `${req.body.role} Successfully Created`,
                newUser
            })

        } catch (error) {
            return res.status(400).send({
                status: 'Error ',
                res: 400,
                msg: 'Error Create User'
            })
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const user = await prisma.user.findUnique({
                where: { email: req.body.email }
            })

            if (!user) throw 'User Not Found';

            const validPass = await compare(req.body.password, user.password!);

            if (!validPass) throw 'Password Incorrect';

            const token = usingToken({
                user_id: user.user_id,
                role: user.role,
                email: user.email,
                verified: user.verified,
                first_name: user.first_name
            }, "24h")

            return res
                .status(201)
                .send({ status: "Success", msg: "Login Success", res: 201, token, user });
        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res: 400,
                msg: "Failed Login User"
            })
        }
    }

    async verificationUser(req: Request, res: Response) {
        try {
            const decoded = verify(req.params.token, process.env.SECRET_KEY!) as { user_id: string };

            const getUser = await prisma.user.update({
                where: { user_id: decoded.user_id },
                data: {
                    verified: true,
                    referral_code: GenerateReferralCode(),
                    point: 0
                },
            })
            return res.status(200).send({
                status: "Updated",
                res: 200,
                msg: "Account successfully verified",
                getUser
            })
        } catch (error) {
            return res.status(400).send({
                status: "Error",
                res: 400,
                msg: "Failed access verification API"
            })
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const user = await prisma.user.findUnique({
                where: { user_id: req.user?.user_id }
            })
            return res.status(200).send({
                status: "Success",
                res: 200,
                msg: "Succes get user data",
                user

            })
        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res: 200,
                msg: "Failed to get user"
            })
        }
    }

    async referralCode(req: Request, res: Response) {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    user_id: req.user?.user_id
                }
            })

            if (!user) throw "User not found"

            if(user.referred_code) throw `${user.referred_code} code already applied your account`

            await prisma.$transaction(async (prisma) => {
                const findReferral = await prisma.user.findFirst({
                    where: {
                        referral_code: req.body.referred_code
                    }
                })

                if (!findReferral) throw "Referral not found"

                const userUpdateReferred = await prisma.user.update({
                    where: {
                        user_id: user.user_id
                    }, data: {
                        referred_code: req.body.referred_code,
                    }
                })

                const userUpdatePoint = await prisma.user.update({
                    where : {
                        user_id : findReferral.user_id
                    }, data : {
                        point : {
                            increment : 10000
                        }
                    }
                })

                return res.status(200).send({
                    status: "Succes",
                    res: 200,
                    msg: "Referral found & Point updated",
                    userUpdateReferred,
                    userUpdatePoint
                })
            })
        } catch (error) {
            return res.status(400).send({
                status: "Failed",
                res: 400,
                msg: "Failed to access referralCode API"
            })
        }
    }
}