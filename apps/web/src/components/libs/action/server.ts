'use server';

import { cookies } from 'next/headers';

export const createCookie = (key: string, value: string) => {
    const oneDay = 24 * 60 * 60 * 1000;
    cookies().set(key, value, { expires: Date.now() + oneDay });
};

export const getCookie = async (key: string) => {
    return cookies().get(key)?.value;
};

export const deleteCookie = (key: string) => {
    cookies().delete(key);
};
