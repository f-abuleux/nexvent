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
    confirmPassword: yup.string().oneOf([yup.ref("password")], 'Passwords must match'),
    first_name: yup.string().required('First name is required'),
    phone: yup.string().required('Phone number is required')
        .min(10, 'Phone number must be at least 10 characters long')
        .max(13, 'Phone number must be at most 13 characters long')
        .matches(/^[0-9]+$/, 'Phone number must be numeric'),
    date_of_birth: yup.string().required('Date of birth is required')
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in ISO 8601 format (YYYY-MM-DD)')
})

export const createEventSchema = yup.object({
    title: yup.string().required('Title is required').min(5, 'Title must be at least 5 characters long').max(20, 'Title must be at most 20 characters long'),
    description: yup.string().required('Description is required').min(25, 'Description must be at least 25 characters long').max(500, 'Description must be at most 500 characters long'),
    date: yup.string().required('Date is required'),
    quantity: yup.number().required("Total Seat is required"),
    price: yup.number().required('Price is required'),
    location: yup.string().required('Location is required').max(20, 'Location must be at most 20 characters long'),
    image: yup.string().required("Banner/Image is required")
})

export const createDiscountEventSchema = yup.object({
    discount_code: yup.string().required("Code name is required").min(10, "Code name 10 character minimum required").max(20, "Code name 20 character maximal").matches(/^[a-zA-Z0-9]+$/, "Code name must be alphanumeric").test('is-not-empty', 'Code name cannot be empty', value => value.trim() !== ''),
    discount_value: yup.number().required("Discount value is required").min(1, 'Discount value must be greater than zero'),
    discount_quota: yup.number().required("Discount quota is required").min(1, 'Discount quota must be greater than zero'),
    type: yup.string().required("Discount Type is required").test('is-not-empty', 'Discount Type cannot be empty', value => value.trim() !== ''),
    start_date: yup.string().required("Starting date is required").test('is-not-empty', 'Starting date cannot be empty', value => value.trim() !== ''),
    end_date: yup.string().required("Ended date is required").test('is-greater', 'End date must be later than start date', function(value) {
        const { start_date } = this.parent;
        return new Date(value) > new Date(start_date);
    }).test('is-not-empty', 'Ended date cannot be empty', value => value.trim() !== ''),
    // discount_event_event_id: yup.string().matches(/[ ]/, "Pick the event")
})