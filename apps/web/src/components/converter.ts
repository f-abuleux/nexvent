export function convertPrice(price: number) {
    return (`Rp. ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
}

export function convertDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', { timeZone: 'Asia/Bangkok' });
}

export const formatDate = (dateString : string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}T00:00:00.000Z`;
};

export const convertDateDatabase = (date : string) =>{
    return date.split("T")[0];
}

export const convertIdr = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

export const checkDiscount = (price : number ) => {
    if (price <= 100) {
        return `${price}%`
    } else {
        return `Rp. ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    }
}