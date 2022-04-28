import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, act } from '@ngrx/effects';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ProductConfService } from './productConf.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { snackbarOpen } from 'src/app/shared/actions/snackbar.action';
import { ProductConfActions } from './action-types';
import { concatMap, map, tap, catchError } from 'rxjs/operators';
import { insertProductConfSuccess, productConfLoadFail, productConfListLoadSukcess, procuctConfDeleteSuccess, productConfUpdateSuccess, insertProductConfElemSuccess, deleteProductConfElemSuccess, updateProductConfElemSukccess } from './procuctConf-action';
import { of } from 'rxjs';
import { ProductDeleteSukcess } from 'src/app/products/products-state/products.action';

@Injectable()
export class ProductsConfEffects {

    insertProductConf$ = createEffect(
        () => this.actions$.pipe(
            ofType(ProductConfActions.insertProductConfStart),
            concatMap(action => this.prodConfService.insertProductConf(action.productConf)),
            map(data => {
                this.showmessage('Dodano pozycję', 'success');
                return insertProductConfSuccess({ productConf: data });
            }, catchError((error) => {
                this.showmessage(error, 'fail');
                return of(productConfLoadFail({ error: error }));
            }))
        )
    );

    LoadProductConfList$ = createEffect(
        () => this.actions$.pipe(
            ofType(ProductConfActions.ProductsConfigListLoadStart),
            concatMap(action => this.prodConfService.getProductCofList(action.productConfParam)),
            map(data => {
                return productConfListLoadSukcess(data);
            }, catchError((error) => {
                this.showmessage(error, 'fail');
                return of(productConfLoadFail({ error: error }));
            }))
        )
    );

    DeleteProductConf = createEffect(
        () => this.actions$.pipe(
            ofType(ProductConfActions.productConfDeleteStart),
            concatMap(action => this.prodConfService.deleteProductConf(action.productConf)),
            map( dane => {
                this.showmessage('pozycja skasowana', 'sukccess')
                return procuctConfDeleteSuccess({productConf: dane});
            }, catchError((error) => {
                this.showmessage(error, 'fail');
                return of(productConfLoadFail({ error: error }));
            }))
        )
    );

    UpdateProductConf = createEffect(
        () => this.actions$.pipe(
            ofType(ProductConfActions.productConfUpdateStart),
            concatMap(action => this.prodConfService.updateProductConf(action.productConf)),
            map(data => {
                this.showmessage('Zaaktualizowano pozycję', 'success');
                return productConfUpdateSuccess({productConf: data,
                    partialProduct: {id: data.id, changes: data}});
            }, catchError((error) => {
                this.showmessage(error, 'fail');
                return of(productConfLoadFail({ error: error }));
            }))
        )
    );
    InsertProductConfElem = createEffect(
        () => this.actions$.pipe(
            ofType(ProductConfActions.insertProductConfElemStart),
            concatMap(action => this.prodConfService.insertOroductConfElem(action.productConfElem)),
            map(data => {
                this.showmessage('dodano pozycję', 'sukcess');
               return insertProductConfElemSuccess({productConfElem: data});
            } , catchError((error) => {
                this.showmessage(error, 'fail');
                return of(productConfLoadFail({ error: error }));
            }))
        )
    );

    DeleteProductConfElem = createEffect (
        () => this.actions$.pipe(
            ofType(ProductConfActions.deleteProductConfElemStart),
            concatMap(action => this.prodConfService.deleteProductConfElem(action.productConfElem)),
           map(data => {
               this.showmessage('stasowano pozycję', 'success');
               return deleteProductConfElemSuccess({productConfElem: data});
           }, catchError((error) => {
            this.showmessage(error, 'fail');
            return of(productConfLoadFail({ error: error }));
        }))
        )
    );
    updateProductConfElem = createEffect (
        () => this.actions$.pipe(
            ofType(ProductConfActions.updateProductConfElemStart),
            concatMap(action => this.prodConfService.updateProductConfElem(action.productConfElem)),
            map(data => {
                this.showmessage('zaktualizowano pozycję', 'sukccess');
                return updateProductConfElemSukccess({productConfElem: data});
            })
        )
    );

    showmessage(message: string, action: string) {
        this.store.dispatch(snackbarOpen({ message: message, action: action }));
    }
    constructor(private actions$: Actions,
        private prodConfService: ProductConfService,
        private store: Store<AppState>) { }
}
