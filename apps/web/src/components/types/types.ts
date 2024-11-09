export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    email: string
    password: string
    first_name: string
    last_name: string
    role: string
    phone: string
    date_of_birth: string
}

export interface IUserData {
    email: string,
    first_name: string,
    last_name: string,
    role: string,
    date_of_birth: string,
    avatar: string,
    phone: string,
    verified: boolean,
    referral_code: string,
    point: number
}

export interface ICreateDiscount {
    discount_code: string;
    discount_value: number;
    discount_quota: number;
    type: string;
    start_date: string;
    end_date: string;
    discount_event_event_id : string
}

export interface ICreateEvent {
    title: string;
    description: string;
    date: string;
    quantity: string,
    price: string;
    location: string;
    category: string
    image: File | null;
}

export interface IEventStatus {
    eventPass: {
        length: number
    },
    eventOnGoing: {
        length: number
    }
    eventTotal: [
        {
            event_id : string,
            title: string,
            date: string,
            price: number,
            quantity: number
            eventCategoryCategory_id: number
        }
    ],
    totalPage: number
}
