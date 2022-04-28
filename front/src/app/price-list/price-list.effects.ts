import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { PriceListService } from './price-list.service';
import { PricelistActions } from './action-type';
import { concatMap, map, catchError } from 'rxjs/operators';
import { loadAppPriceListTypeSukcess, pricelistLoadFailAction, ProductPriceLoadSuccess, 
    ProdudcsPriceLoadSuccess, AddUpdateProductPriceToProductSucess, ProductPriceOrderCustomerSucces } from './price-list.action';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { snackbarOpen } from '../shared/actions/snackbar.action';
import { of } from 'rxjs';

@Injectable()
export class PricelistEffects {

    loadPricelistType$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(PricelistActions.loadAllPriceListType),
                concatMap(action => this.pricelistService.loadAllPricetype()),
                map(data => loadAppPriceListTypeSukcess({ price: data }))
            )
    );

    UpdatePriceListType$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(PricelistActions.updatePriceListType),
                concatMap(action => this.pricelistService.updatePriceType(action.price)),
                map(data => {
                    this.showmessage('Zaktualizowano pozycje', 'success');
                    return loadAppPriceListTypeSukcess({ price: data });
                }, catchError((error) => {
                    this.showmessage(error, 'fail');
                    return of(pricelistLoadFailAction({ error: error }));
                }))
            )
    );
    // for search list
    LoadProductPrice$ = createEffect(
        () => this.actions$.pipe(
            ofType(PricelistActions.ProductPriceLoadAction),
            concatMap(action => this.pricelistService.loadProductPrice(action.producPriceParams)),
            map(data => {
                return ProductPriceLoadSuccess({ productPriceResponce: data });
            }, catchError((error) => {
                this.showmessage(error, 'fail');
                return of(pricelistLoadFailAction({ error: error }));
            }))
        )
    );
    // for product view
    LoadProductPrices$ = createEffect(
        () => this.actions$.pipe(
            ofType(PricelistActions.ProductPricesLoad),
            concatMap(action => this.pricelistService.getPricesForProduct(action.productId)),
            map(data => ProdudcsPriceLoadSuccess(data)
                , catchError((error) => {
                    this.showmessage(error, 'fail');
                    return of(pricelistLoadFailAction({ error: error }));
                }))
        )
    );
    InsertProductPrice$ = createEffect (
        () => this.actions$.pipe(
            ofType(PricelistActions.AddProductPriceToProductStart),
            concatMap( action =>
                this.pricelistService.insertProductPrice(action.product, action.priceType)),
            map(data => {
            this.showmessage('Dodano pozycję', 'Success');
               return AddUpdateProductPriceToProductSucess({productPrice: data});
            }, catchError((error) => {
                this.showmessage(error, 'fail');
                return of(pricelistLoadFailAction({ error: error }));
            }))
        )
    );
    updateProductPrice = createEffect (
        () => this.actions$.pipe(
            ofType(PricelistActions.UpdateProductPriceToProduct),
            concatMap(action => this.pricelistService.updateProductPrice(action.product, action.priceType)),
            map(data => {
                this.showmessage('Zaktualizowano pozycję', 'Success')
                   return AddUpdateProductPriceToProductSucess({productPrice: data});
                }, catchError((error) => {
                    this.showmessage(error, 'fail');
                    return of(pricelistLoadFailAction({ error: error }));
                }))
        )
    );
    productPriceOrderCustomerload = createEffect (
        () => this.actions$.pipe(
            ofType(PricelistActions.ProductPriceOrderCustomerLoad),
            concatMap(action => this.pricelistService.loadProductPriceOrderCustomer(action.producPriceParams)),
            map(dane =>  ProductPriceOrderCustomerSucces({total: dane.total, 
                productsPrice: dane.productPrice , products: dane.product, priceSpecs: dane.priceSpec })  )
        )
    );

    // ProductPriceOrderCustomerLoad

    showmessage(message: string, action: string) {
        this.store.dispatch(snackbarOpen({ message: message, action: action }));
    }

    constructor(private actions$: Actions, private pricelistService: PriceListService, private store: Store<AppState>) { }
}
