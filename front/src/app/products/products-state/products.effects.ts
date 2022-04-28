import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsActions } from './action-types';
import { ProductsService } from './products.service';
import { concatMap, map, tap, catchError } from 'rxjs/operators';
import { loadAllCategorySukcess, 
    insertProductSukcess, 
    ProductLoadSuccessAction, 
    ProductLoadFailAction, ProductUpdateSukcess, 
    ProductDeleteSukcess } from './products.action';
import { snackbarOpen } from '../../shared/actions/snackbar.action';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { ProductsResponce } from '../model/products-responce';
import { of, forkJoin } from 'rxjs';
import { Products } from '../model/products';

@Injectable()
export class ProductsEffects {

    loadCategory$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(ProductsActions.loadAllCategory),
                concatMap(action => this.productService.loadAllCategory()),
                map(data => loadAllCategorySukcess({ category: data }))
            ));

    insertCategory$ = createEffect(
        (): any => this.actions$
            .pipe(
                ofType(ProductsActions.insertCategoryStart),
                concatMap(action => this.productService.insertCategory(action.category)),
                map(data => {
                    this.showmessage('Dodano kategorię', 'succmstess');
                    return loadAllCategorySukcess({ category: data });
                })
            ));

    updateCategory$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(ProductsActions.updateCategory),
                concatMap(action => this.productService.updateCategory(action.category)),
                map(data => {
                    this.showmessage('Zaktualizowano kategorie', 'sukcess');
                    return loadAllCategorySukcess({ category: data });
                })
            ));

    deleteCategory$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(ProductsActions.deleteCategory),
                concatMap(action => this.productService.deleteCategory(action.category)),
                map(data => {
                    this.showmessage('Skasowano kategorie', 'Success');
                    return loadAllCategorySukcess({ category: data });
                })
            ));

    insertProduct$ = createEffect(
        () => this.actions$.pipe(
            ofType(ProductsActions.insertProductStart),
            concatMap(action => this.productService.insertProduct(action.product)),
            map(data => {
                this.showmessage('dodano produkt', 'Success');
                return insertProductSukcess({ product: data });
            })
        )
    );

    getProducts$ = createEffect(
        () => this.actions$.pipe(
            ofType(ProductsActions.ProductsLoadAction),
            concatMap(action => this.productService.getProducts(action.product)),
            map(((product: ProductsResponce) => {
                return ProductLoadSuccessAction({ product: product });
            }), catchError((error) => of(ProductLoadFailAction(error)))
            )
        )
    );

    uppdateProduct = createEffect(
        () => this.actions$.pipe(
            ofType(ProductsActions.ProductUpdateStart),
            concatMap( action => this.productService.updateProduct(action.product)),
            map((product: Products) => {
                this.showmessage('Zaktualizowano pozycję', 'succes');
                return ProductUpdateSukcess({product: product,
                    partialProduct: {id : product.id, changes: product}});
            }, catchError((error) => {
                this.showmessage(error, 'fail');
                return of(ProductLoadFailAction(error))
            }) )
        )
    );

    deleteProduct$ = createEffect(
        () => this.actions$.pipe(
            ofType(ProductsActions.ProductDeleteStartAction),
            concatMap(action => {
               const request = this.productService.deleteProduct(action.product);
               const prod = of(action.product);
            return forkJoin(request, prod);
            }),
            map((responce) => {
                this.showmessage('Skasowano pozycję', 'sukcess');
                return ProductDeleteSukcess({product: responce[1]});
            }, catchError((error) => {
                this.showmessage( error, 'fail');
                return of(ProductLoadFailAction(error));
            }))
        )
    );
    


    showmessage(message: string, action: string) {
        this.store.dispatch(snackbarOpen({ message: message, action: action }));
    }

    constructor(private actions$: Actions, private matSnackBar: MatSnackBar,
        private productService: ProductsService, private store: Store<AppState>) { }
}
