import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Customers } from '../model/customers';
import { CategoryC } from '../model/categoryC';
import { CustomersActions } from '../action-type';
import { createReducer, on } from '@ngrx/store';
import { act } from '@ngrx/effects';

export interface CustomersState extends EntityState<Customers> {
    category: CategoryC[];
    allCategoryCustLoaded: boolean;
    customerLoad: boolean;
    error: boolean;
    errorMessage: string;
    total: number;
}
export const adapter = createEntityAdapter<Customers>(
);
export const initialCustomerState = adapter.getInitialState({
    category: undefined,
    allCategoryCustLoaded: false,
    customerLoad: false,
    error: false,
    errorMessage: '',
    total: 0
});



const _customersReducer = createReducer(
    initialCustomerState,
    on(CustomersActions.loadAllCategoryCSukcess,
        (state, action) => (
            {
                ...state,
                category: action.category,
                allCategoryCustLoaded: true,
                error: false
            }
        )),
    on(CustomersActions.CustomerLoadFailAction,
        (state, action) => (
            adapter.removeAll({
                ...state, error: true, customerLoad: false, total: 0,
                errorMessage: action.error
            })
        )),
    on(CustomersActions.insertCustomerSukcess,
        (state, action) => ( adapter.addOne(action.customer, {
            ...state
        }))),
    on(CustomersActions.CustomersLoadActionStart, (state, action) => ({
        ...state, customerLoad: false
    })),
    on(CustomersActions.CustomerLoadSukcess,
        (state, action) => (
            adapter.addAll(action.customerres.customers, {
                ...state,
                customerLoad: true,
                error: false,
                total: action.customerres.total
            })
        )),
    on(CustomersActions.UpdateCustomerSukcess, (state, action) => (
        adapter.updateOne(action.customerPratial, {
            ...state
        })
    )),
    on(CustomersActions.DeleteCustomerSukcess, (state, action) => (
        adapter.removeOne(action.customer.id, {
            ...state
        })
    )),
    on(CustomersActions.GetGustomerSuccess, (state, action) => (
        adapter.addOne(action.customer , {
            ...state
        })
    ))
);

export function customersReducer( state, action ){
    return _customersReducer(state, action);
  }


export const {selectAll} = adapter.getSelectors();
