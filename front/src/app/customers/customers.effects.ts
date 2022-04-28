import { createEffect, ofType, Actions } from '@ngrx/effects';
import { concatMap, map, catchError } from 'rxjs/operators';
import { CustomersActions } from './action-type';
import { CustomersService } from './customers.service';
import { loadAllCategoryCSukcess,
    insertCustomerSukcess,
    CustomersLoadActionStart, CustomerLoadFailAction,
    CustomerLoadSukcess, UpdateCustomerSukcess,
    DeleteCustomerSukcess,
    GetGustomerSuccess } from './customers.action';
import { Injectable } from '@angular/core';
import { snackbarOpen } from '../shared/actions/snackbar.action';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { of } from 'rxjs';

@Injectable()
export class CustomersEffects {

    loadCategoryC$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(CustomersActions.loadAllCategoryC),
                concatMap(action => this.customersService.loadAllCategory()),
                map(data => loadAllCategoryCSukcess({ category: data }))
            ));

    insertCategoryC$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(CustomersActions.insertCategoryCStart),
                concatMap(action => this.customersService.insertCategory(action.category)),
                map(data => {
                    this.showmessage('Dodano pozycję', 'sukcess')
                    return loadAllCategoryCSukcess({ category: data });
                })
            ));

    updateCategoryC$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(CustomersActions.updateCategoryC),
                concatMap(action => this.customersService.updateCategory(action.category)),
                map(data => {
                    this.showmessage('zaktualizowano pozycję', 'sukcess');
                    return loadAllCategoryCSukcess({ category: data });
                })
            ));

    deleteCategoryC$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(CustomersActions.deleteCategoryC),
                concatMap(action => this.customersService.deleteCategory(action.category)),
                map(data => {
                    this.showmessage('skasowano pozycję', 'sukcess')
                    return loadAllCategoryCSukcess({ category: data })})
            ));

    insertCustomer$ = createEffect(
        () => this.actions$.pipe(
            ofType(CustomersActions.insertCustomerStart),
            concatMap( action => this.customersService.insertCustomers(action.customer)),
            map(data => {
                            this.showmessage('Dodano pozycję', 'sukcess');
                            return insertCustomerSukcess({customer: data});
            }, catchError((error) => {
                this.showmessage('niedodano pozycji', 'fail');
               return of( CustomerLoadFailAction(error));
            }))
        ));
    getCustomersList$ = createEffect(
        () => this.actions$.pipe(
            ofType(CustomersActions.CustomersLoadActionStart),
            concatMap(action => this.customersService.getCustomers(action.customerspar)),
            map(data =>  CustomerLoadSukcess({ customerres: data}))
        )
    );
    updateCustomer$ = createEffect(
        () => this.actions$.pipe(
            ofType(CustomersActions.UpdateCustomerStart),
            concatMap( action => this.customersService.updateCustomer(action.customer)),
            map(data => {
                this.showmessage('Pozycja została zaktualizowana', 'suksess');
                return UpdateCustomerSukcess({customerPratial: {id: data.id, changes: data}});
            } , catchError((error) => {
                this.showmessage('nie zaktualizowano pozycji', 'fail');
                return of(CustomerLoadFailAction(error));
            }))
        )
    ) ;
    deleteCustomer$ = createEffect(
        () => this.actions$.pipe(
            ofType(CustomersActions.DeleteCustomerStart),
            concatMap(action => this.customersService.deleteCustomer(action.customer)),
            map(data => {
                this.showmessage('Skasowano pozycję', 'sukcess');
                return DeleteCustomerSukcess({customer: data});
            }, catchError((error) => {
                this.showmessage('Nie skasowani pozycji', 'fail');
                return of(CustomerLoadFailAction(error));
            }))
        )
    );
    GetCustemer$ = createEffect(
        () => this.actions$.pipe(
            ofType(CustomersActions.GetCustomerStart),
            concatMap(action => this.customersService.getCustomer(action.customerId)),
            map(data => GetGustomerSuccess({customer: data}))
        )
    );

            showmessage(message: string, action: string) {
                this.store.dispatch(snackbarOpen({ message: message, action: action }));
            }
    constructor(private actions$: Actions, private customersService: CustomersService,
        private store: Store<AppState>) { }
}
