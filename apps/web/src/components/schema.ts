import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup.string().email('Invalid format').required('Email is required'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
        .matches(/[a-z]/, 'Password must include at least one lowercase letter')
        .matches(/\d/, 'Password must include at least one number')
        .matches(
            /[!@#$%^&*]/,
            'Password must include at least one special character from !@#$%^&*',
        ),
});

export const registerSchema = yup.object({
    email : yup.string().email('Invalid format').required('Email is required'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
        .matches(/[a-z]/, 'Password must include at least one lowercase letter')
        .matches(/\d/, 'Password must include at least one number')
        .matches(
            /[!@#$%^&*]/,
            'Password must include at least one special character from !@#$%^&*',
        ),
    confirmPassword: yup.string().oneOf([yup.ref("password")], 'Passwords must match'),
    first_name: yup.string().required('First name is required'),
    phone : yup.string().required('Phone number is required')
        .min(10, 'Phone number must be at least 10 characters long')   
        .max(13, 'Phone number must be at most 13 characters long') 
        .matches(/^[0-9]+$/, 'Phone number must be numeric')
    ,
    date_of_birth: yup.date().required('Date of birth is required')
})