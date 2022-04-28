import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomersState } from './reducers/customers.reducer';

export const selectCustomerState = createFeatureSelector<CustomersState>('customers');
export const selectpPriceListState = createFeatureSelector<PricelistState>('pricelist');

import * as fromCustomers from './reducers/customers.reducer';
import { PricelistState } from '../price-list/reducers/pricelist.reducer';
// produkty pricelist


export const selectAllCustomersCategory = createSelector(
    selectCustomerState,
    state => state.category
);
export const areCategoryCustLoaded = createSelector (
    selectCustomerState,
    state => state.allCategoryCustLoaded
);
export const areCustomersLoaded = createSelector (
    selectCustomerState,
    customerState => customerState.customerLoad
);
export const getTotalCustomers = createSelector (
    selectCustomerState,
    total => total.total
);

export const selectAllPriceCategory = createSelector (
    selectpPriceListState,
    state => state.priceType
);
export const getAllCustomers = createSelector (
    selectCustomerState,
    fromCustomers.selectAll
);
export const getAllCustomersWithCategory = createSelector(
    getAllCustomers,
    selectAllCustomersCategory,
    selectAllPriceCategory,
    (customer, category, price) => {
        return customer.map((item) => ({
            ...item,
            priceSpecs: price.filter(x => x.id === item.priceId)[0].name,
            categoryCustomer: category.filter(c => c.id === item.categoryCustomerId)[0].name
        }));
    }
);

export const getOneCustomer = (customerId: string) => createSelector (
    getAllCustomers,
    customers =>  customers.filter(x => x.id === customerId)[0]
);
