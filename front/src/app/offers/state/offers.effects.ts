import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { OffersService } from './offers.service';
import { snackbarOpen } from 'src/app/shared/actions/snackbar.action';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { OffersAction } from './action-types';
import {
    loadAllCurrencySuccess,
    updateCurrencySuccess, inserCurrencySuccess,
    InsertOrderSukcess, OrderListLoadSuccess,
    OrderDeleteSuccess, insertOrderHeaderSuccess,
    OrderloadElemHeaderSuccess, OrderloadElemSuccess,
    DeleteHeaderFoOrderSukcess, UpdateDiscountSucces,
    insertOrderElemSuccess, updateOrderElemSuccess,
    deleteOrderElemSuccess, UpdateOrderHeaderSukcess,
    OrderElemConfLoadSuccess, InsertSElemConfSuccess,
    DeleteOrderSElemSuccess, UpdateOrderSElemSuccess,
    UpdateElementConfSuccess,
    LoadOrderSuccessResolver
} from './offers.action';
import { OrderHeader } from '../model/order-header';
import { Order } from '../model/order';
import { Router } from '@angular/router';

@Injectable()
export class OffersEffects {


    loadCurrencys$ = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.loadAllCurrencyStart),
            concatMap(action => this.offersService.loadAllCurrency()),
            map(data => loadAllCurrencySuccess({ currency: data }))
        )
    );

    updateCurrency$ = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.updateCurrencyStart),
            concatMap(action => this.offersService.updateCurrency(action.currency)),
            map(data => {
                this.showmessage('zaaktualizowano pozycję', 'success');
                return updateCurrencySuccess({ currency: data });
            })
        )
    );
    insertCurrency$ = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.insertCurrencyStart),
            concatMap(action => this.offersService.insertCurrency(action.currency)),
            map(data => {
                this.showmessage('zaaktualizowano pozycję', 'success');
                return inserCurrencySuccess({ currency: data });
            })
        )
    );
    // przekierowanie na nową ofertę do edycji
    insertOrder$ = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.insertOrderStart),
            concatMap(action => this.offersService.insertOrder(action.order)),
            map((data: Order) => {
                this.showmessage('Dodano pozycję', 'success');
                this.route.navigate([`/offers/edit/${data.id}`]);
                return InsertOrderSukcess({ order: data });
            })
        )
    );
    loadOferList$ = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.OrderListLoadStart),
            concatMap(action => this.offersService.loadOffersList(action.Orderparam)),
            map(data => OrderListLoadSuccess(data))
        )
    );

    deleOrder$ = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.OrderDeleteStart),
            concatMap(action => this.offersService.deleteorder(action.order)),
            map(data => OrderDeleteSuccess({ order: data }))
        )
    );

    insertOrderHeader = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.insertOrderHeaderStart),
            concatMap(action => this.offersService.insertOrderHeader(action.orderHeader)),
            map((data: OrderHeader) => {
                this.showmessage('dodano nagłówek', 'success');
                return insertOrderHeaderSuccess({ orderHeader: data });
            })
        )
    );
    loadOrderHeader = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.OrderloadElemStart),
            concatMap(action =>
                this.offersService.loadOrderElemHeader(action.orderId)),
            switchMap(d => [
                LoadOrderSuccessResolver({order: d.order}),
                OrderloadElemSuccess({ orderElem: d.orderElem }),
                OrderloadElemSuccess({ orderElem: d.orderElemConf }),
                OrderloadElemSuccess({ orderElem: d.orderElemHand }),
                OrderloadElemHeaderSuccess({ orderHeader: d.orderHeader })
            ]))
    );
    deleteOrderHeader = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.DeleteHeaderFoOrderStart),
            concatMap(action => this.offersService.deledeOrderHeader(action.orderHeader)),
            map(data => {
                this.showmessage('skasowano pozycję', 'success');
                return DeleteHeaderFoOrderSukcess({ orderHeader: data });
            })
        )
    );
    updateOrderHeader = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.UpdateOrderHeaderStart),
            concatMap(action => this.offersService.updateOrderHeader(action.orderHeader)),
            map(dane => UpdateOrderHeaderSukcess({ orderHeader: dane }))
        )
    );
    updateDiscountOrder = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.UpdateDiscountOrder),
            concatMap(action => this.offersService
                .updateDiscountOrder(action.order, action.discount)),
            switchMap(d => [
                UpdateDiscountSucces({
                    partial: d.orderElem.map(m => {
                        return { id: m.id, changes: m };
                    })
                }),
                UpdateDiscountSucces({
                    partial: d.orderElemConf.map(m => {
                        return { id: m.id, changes: m };
                    })
                }),
                UpdateDiscountSucces({
                    partial: d.orderElemHand.map(m => {
                        return { id: m.id, changes: m };
                    })
                })
            ])
        )
    );

    insertOrderElem = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.insertOrderElemStart),
            concatMap(action => this.offersService.insertOrderElem(action.orderElem)),
            map(data => {
                this.showmessage('dodano pozycję', 'success');
                return insertOrderElemSuccess({ orderElem: data });
            })
        )
    );
    updateOrderElem = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.updateOrderElemStart),
            concatMap(action => this.offersService.updateOrderelem(action.orderElem)),
            map(data => {
                return updateOrderElemSuccess({
                    orderElem: data,
                    partialOrderElem: { id: data.id, changes: data }
                });
            })
        )
    );
    deleteOrderElem = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.deleteOrderElemStart),
            concatMap(action =>
                this.offersService.deleteOrderElement(action.orderElem)),
            map(data => {
                this.showmessage('skasowano pozycję', 'success');
                return deleteOrderElemSuccess({ orderElem: data });
            })
        )
    );
    insertOrderConfElem = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.InsertOrderElemConfStart),
            concatMap(action => this.offersService.insertOrderElemConf(action.orderElem)),
            map(data => {
                this.showmessage('dodano pozycję', 'success');
                return insertOrderElemSuccess({ orderElem: data });
            })
        )
    );
    loadOrderElemConfProd = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.OrderElemConfLoadStart),
            concatMap(action => this.offersService
                .loadOrdersElemCofig(action.orderElemConfId)),
            map(dane => OrderElemConfLoadSuccess({
                product: dane.product,
                orderSElemConf: dane.orderSElemConf, productConfElem: dane.productConfElem,
                productPrice: dane.productPrice, priceSpec: dane.priceSpec
            }))
        )
    );
    InsertOrderSElem = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.InsertSElemConfStart),
            concatMap(action => this.offersService.InsertOrderSElem(action.orderSElemConf)),
            map(dane => {
                this.showmessage('dodano pozycję', 'success');
                return InsertSElemConfSuccess({
                    orderSElemConf: dane.orderSElemConf,
                    partialOrderElem: {
                        id: dane.orderElem.id,
                        changes: dane.orderElem
                    }
                });
            })
        )
    );
    DeleteOrderSElem = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.DelereOrderSElemStart),
            concatMap(action => this.offersService.DeleteOrderSElem(action.orderSElemConf)),
            map(data => {
                this.showmessage('skasowano pozycję', 'success');
                return DeleteOrderSElemSuccess({
                    orderSElemConf: data.orderSElemConf,
                    partialOrderElem: { id: data.orderElem.id, changes: data.orderElem }
                });
            })
        )
    );
    UpdateOrderSElem = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.UpdateOrderSElemStart),
            concatMap(action => this.offersService.UpdateOrderSElem(action.orderSElemConf)),
            map(data => {
                this.showmessage('zaktualizowano pozycję', 'success');
                return UpdateOrderSElemSuccess(
                    {
                        orderSElemConf: data.orderSElemConf,
                        partialOrderElem: { id: data.orderElem.id, changes: data.orderElem }
                    });
            })
        )
    );
    UpdateElemConf = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.UpdateElementConfStart),
            concatMap(action => this.offersService
                .UpdateOrderElemConfig(action.orderElemConf)),
            map(data => UpdateElementConfSuccess(
                { partialOrderElemConf: { id: data.id, changes: data } }))
        )
    );
    DeleteOrderElemConf = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.deleteOrderConfStart),
            concatMap(action =>
                this.offersService.DeleteOrderelemConf(action.orderElem)),
            map(data => {
                this.showmessage('skasowano pozycje', 'success');
                return deleteOrderElemSuccess({ orderElem: data });
            })
        )
    );
    InsertOrederElemHand = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.InsertOrderElemHandStart),
            concatMap(action =>
                this.offersService.InsertOrderElemHand(action.orderElem)),
            map(data => {
                this.showmessage('dodano pozycję', 'success');
                return insertOrderElemSuccess({ orderElem: data });
            })
        )
    );
    UpdateOrderelemHand = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.UpdateOderElemHandStart),
            concatMap(action =>
                this.offersService.UpdateOrderElemHand(action.orderElem)),
            map((data) => {
                this.showmessage('zaktualizowano pozycję', 'success');
                return updateOrderElemSuccess({
                    orderElem: data,
                    partialOrderElem: { id: data.id, changes: data }
                });
            })

        )
    );
    DeleteOrderElemHand = createEffect(
        () => this.actions$.pipe(
            ofType(OffersAction.DeleteOrderElemHanStart),
            concatMap(action =>
                this.offersService.DeleteOrderElemHand(action.orderElem)),
            map(dane => {
                this.showmessage('skasowano', 'success');
                return deleteOrderElemSuccess({ orderElem: dane });
            })
        )
    );

    showmessage(message: string, action: string) {
        this.store.dispatch(snackbarOpen({ message: message, action: action }));
    }

    constructor(private actions$: Actions, private matSnackBar: MatSnackBar,
        private offersService: OffersService, private store: Store<AppState>,
        private route: Router) { }

}
