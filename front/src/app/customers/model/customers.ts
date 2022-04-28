export interface Customers {
    id: string;
    akronim: string;
    name: string;
    phone: string;
    contact: string;
    streed: string;
    city: string;
    nip: string;
    zipCode: string;
    status: number;
    priceId: string;
    priceSpecs?: string;
    cost?: number;
    categoryCustomerId: string;
    categoryCustomer?: string;
    gidCdn?: number;
}
