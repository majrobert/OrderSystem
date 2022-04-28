import { Customers } from 'src/app/customers/model/customers';
import { Currency } from './currency';

export interface Order {
    id?: string;
    numberYear?: string;
    description: string;
    dateCreation: Date;
    dateLimit: Date;
    dateReali: Date;
    status: number;
    customer?: Customers;
    customerId: string;
    customerDId: string;
    currency?: Currency;
    currencyId: string;
    exchange: number;
    series: string;
    userId: string;
    value: number;
    valueBrutto: number;
    discount: number;
}
