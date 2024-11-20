'use client'

import { formatDate } from "@/components/libs/action/converter"
import { registerUser } from "@/components/libs/action/login"
import { createCookie } from "@/components/libs/action/server"
import { registerSchema } from "@/components/types/schema"
import { IRegister } from "@/components/types/types"
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function RegisterAdmin() {
    const router = useRouter()

    const register = async (data: IRegister, action: FormikHelpers<IRegister>) => {
        try {
            const { result, ok } = await registerUser(data);
            if (!ok) throw result.msg;
            createCookie('token', result.token);
            toast.success(result.msg);
            router.push('/');
            action.resetForm();
            router.refresh();
        } catch (error) {
            router.refresh()
            action.resetForm();
            toast.error(error as string);
        }
    }

    const initialValues: IRegister = {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        role: "ADMIN",
        phone: '',
        date_of_birth: ''
    }

    return (
        <div className="relative w-full h-svh ">
            <div className="absolute inset-0 bg-[url('/bg-login.webp')] bg-cover bg-center  blur-sm -z-20"></div>
            <div className="relative flex text-[24px] z-20 top-24 w-full h-4/5 text-center items-center justify-center">
                <Formik
                    initialValues={initialValues}
                    validationSchema={registerSchema}
                    onSubmit={(values, actions) => {
                        console.log(values)
                        const formattedValues = {
                            ...values,
                            date_of_birth: formatDate(values.date_of_birth)
                        };
                        console.log(formattedValues)
                        register(formattedValues, actions)
                    }} >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col p-4 gap-2 w-[350px] items-center">
                            <Image src={'/nexvent.png'} alt="Next.js Logo" width={100} height={100} />
                            <p className='font-light text-[12px] w-[300px]'>Create your next events on <span className='font-medium'>NexVent</span>, already have an account? <a href="/login-admin" className="font-medium underline">Login Here!</a></p>
                            <div className="flex flex-col w-full">
                                <label htmlFor="email" className="text-darkestblue  text-[16px]">Email</label>
                                <Field type="email" name="email" className="px-5 py-2 border border-main rounded-full focus:outline-none text-[16px]" placeholder="nexvent@gmail.com" />
                                <ErrorMessage name="email" component="div" className="text-darkpurplered text-[12px]" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="first_name" className="text-darkestblue text-[16px]">Event Organizer Name</label>
                                <Field type="text" name="first_name" className="px-5 py-2 border border-main rounded-full focus:outline-none text-[16px]" />
                                <ErrorMessage name="first_name" component="div" className="text-darkpurplered text-[12px]" />
                            </div>
                            <div className="w-full border-[1px] p-2 rounded-[30px]">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="password" className="text-darkestblue text-[16px]">Password</label>
                                    <Field type="password" name="password" className="px-5 py-2 border border-main rounded-full focus:outline-none text-[16px]" />
                                    <ErrorMessage name="password" component="div" className="text-darkpurplered text-[12px]" />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="confirmPassword" className="text-darkestblue text-[16px]">Confirm Password</label>
                                    <Field type="password" name="confirmPassword" className="px-5 py-2 border border-main rounded-full focus:outline-none text-[16px]" />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-darkpurplered text-[12px]" />
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="phone" className="text-darkestblue text-[16px]">Phone</label>
                                <Field type="text" name="phone" className="px-5 py-2 border border-main rounded-full focus:outline-none text-[16px]" placeholder="08XXXXXXXXXX" />
                                <ErrorMessage name="phone" component="div" className="text-darkpurplered text-[12px]" />
                            </div>
                            <div className="flex flex-col  w-full">
                                <label htmlFor="date_of_birth" className="text-darkestblue text-[16px]">Date of Birth</label>
                                <Field type="date" name="date_of_birth" className="px-5 py-2 border border-main rounded-full focus:outline-none text-[16px]" />
                                <ErrorMessage name="date_of_birth" component='div' className="text-darkpurplered text-[12px] fix " />
                            </div>
                            <button type="submit" className="px-4 py-1 w-[125px] bg-main  font-medium rounded-full mt-4 text-lightestcream text-[20px] bg-darkestblue active:scale-95 duration-200 hover:bg-darkcream" disabled={isSubmitting}>Register</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}