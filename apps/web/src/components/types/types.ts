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
    discount_event_event_id: string
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
            event_id: string,
            title: string,
            date: string,
            price: number,
            quantity: number
            eventCategoryCategory_id: number
        }
    ],
    totalPage: number
}

export interface IDiscountStatus {
    discountOnGoing: []
    discountPass: []
    discountTotal: [{
        discount_code: string
        discount_value: number,
        discount_quota: number,
        discount_event_event_id: string,
        discount_event: {
            price: number,
            title: string,
            location: string
        }
        type: string,
        start_date: string,
        end_date: string,
    }],
    totalPage: number
}

export interface IDetailEvent {
    detailEvent: {
        event_id: string,
        title: string,
        description: string,
        image: string,
        date: string,
        quantity: number,
        price: number,
        location: string,
        eventCategoryCategory_name: string,
    },
}

export interface ICartData {
    events: {
        event_id: string,
        title: string,
        date: string,
        price: number,
        quantity: number,
        location: string,
        eventCategoryCategory_id: number
    }[]
    getCart: {
        discountDiscount_name: string,
        event_id: string,
        order_id: string,
        price: number,
        quantity: number,
        totalPrice: number,
        user_id: string
    }[]
}

export interface IAddToCart {
    event_id: string,
    quantity: number,
    price: number
}


export interface ITransactionData {
    status: string,
    res: number,
    msg: string,
    totalTransaction: number,
    totalPage: number,
    cart: [
        {
            cart_id: string,
            event_id: string,
            quantity: number,
            totalPrice: number,
            status_order: string,
            created_at: string,
            updated_at: string,
            Event : {
                title : string
                description : string,
                eventCategoryCategory_name : string
            }
        }
    ]
}
