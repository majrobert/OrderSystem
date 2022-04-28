import { createAction, props } from '@ngrx/store';
import { CategoryC } from './model/categoryC';
import { Customers } from './model/customers';
import { CustomersParams } from './model/customers-params';
import { CustomersResponce } from './model/customers-responce';
import { Update } from '@ngrx/entity';

export const loadAllCategoryC = createAction (
    '[Customers m] load all customers category'
);

export const loadAllCategoryCSukcess = createAction (
    '[Customers m] load category sukcess',
    props<{category: CategoryC[]}>()
);
export const insertCategoryCStart = createAction (
    '[Customers m] insert new category',
    props<{category: CategoryC}>()
);
export const updateCategoryC = createAction (
    '[Customers m] update category',
    props<{category: CategoryC}>()
);
export const deleteCategoryC = createAction (
    '[Customers m] delete category',
    props<{category: string}>()
);
export const CustomerLoadFailAction = createAction (
    '[Customers m] load Fail',
    props<{error: any}>()
);
// cuatomers
export const insertCustomerStart = createAction(
    '[Customer m] start insert customer',
    props<{customer: Customers}>()
);
export const insertCustomerSukcess = createAction (
    '[Customer m] insert sukcess',
    props<{customer: Customers}>()
);
export const CustomersLoadActionStart = createAction (
    '[Customers m] load customers start',
    props<{customerspar: CustomersParams}>()
);
export const CustomerLoadSukcess = createAction (
    '[Customers m] load customers sukcess',
    props<{customerres: CustomersResponce}>()
);
export const UpdateCustomerStart = createAction (
    '[Customer m] start updata customer',
    props<{customer: Customers}>()
);
export const UpdateCustomerSukcess = createAction (
    '[Customer m] update customer sukcess',
    props<{customerPratial: Update<Customers>}>()
);
export const DeleteCustomerStart = createAction (
    '[Customer m] delete customer start',
    props<{customer: Customers}>()
);
export const DeleteCustomerSukcess = createAction (
    '[Customer m] delete customer sukcess',
    props<{customer: Customers}>()
);
export const GetCustomerStart = createAction (
    '[customer m] get customer',
    props<{customerId: string}>()
);
export const GetGustomerSuccess = createAction (
    '[Customer m] get customer sukcess',
    props<{customer: Customers}>()
);



