'use client'

import { loginUser } from '@/components/libs/action/login';
import { createCookie } from '@/components/libs/action/server';
import { loginSchema } from '@/components/schema';
import { ILogin } from '@/components/types/types';
import { Form, Formik, FormikHelpers, Field, ErrorMessage } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';

export default function LoginUser() {
    const router = useRouter()

    const login = async (data: ILogin, action: FormikHelpers<ILogin>) => {
        try {
            const { result, ok } = await loginUser(data);
            if (!ok) throw result.msg;
            createCookie('token', result.token);
            toast.success(result.msg);
            setTimeout(() => {
                router.push('/');
            }, 200)
            action.resetForm();
            router.refresh();
        } catch (error) {
            router.refresh()
            action.resetForm();
            toast.error(error as string);
        }
    }

    const initialValues: ILogin = {
        email: '',
        password: ''
    }

    return (
        <div className="relative w-full h-svh">
            <div className="absolute inset-0 bg-[url('/bg-login.webp')] bg-cover bg-center  blur-sm -z-20"></div>
            <div className="relative flex text-[24px] z-20 top-20 w-full h-4/5 text-center items-center justify-center">
                <Formik
                    initialValues={initialValues}
                    validationSchema={loginSchema}
                    onSubmit={(values, actions) => {
                        console.log(values)
                        login(values, actions)
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col p-4 gap-5 w-[350px] items-center">
                            {/* <MdAccountCircle className="text-6xl text-darkestblue" size={80}/> */}
                            <Image src={'/nexvent.png'} alt="Next.js Logo" width={100} height={100} />
                            <p className='font-light text-[12px]'>Find your next events on <span className='font-medium'>NexVent</span></p>
                            <div className="flex flex-col space-y-2 w-full">
                                <label htmlFor="email" className="text-darkestblue  text-[16px]">Email</label>
                                <Field type="email" name="email" className="px-5 py-2 border border-main rounded-full focus:outline-none text-[16px]" />
                                <ErrorMessage name="email" component="div" className="text-darkpurplered text-[12px]" />
                            </div>
                            <div className="flex flex-col space-y-2 w-full">
                                <label htmlFor="password" className="text-darkestblue text-[16px]">Password</label>
                                <Field type="password" name="password" className="px-5 py-2 border border-main rounded-full focus:outline-none text-[16px]" />
                                <ErrorMessage name="password" component="div" className="text-darkpurplered text-[12px]" />
                            </div>
                            <button type="submit" className="px-4 py-1 w-[125px] bg-main  font-medium rounded-full mt-4 text-lightestcream text-[20px] bg-darkestblue active:scale-95 duration-200 hover:bg-darkcream" disabled={isSubmitting}>Login</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}