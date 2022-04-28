import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductsRoutingModule } from './products-routing.module';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material.module';
import { ProductsComponent } from '../shared/partial-component/components/products/products.component';
import { ProdCategoryComponent } from './prod-category/prod-category.component';
import { CategoryResolver } from './resolver/categoryProd.resolver';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './products-state/products.effects';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './products-state/products.reducers';
import { SnackbarEffects } from '../shared/effects/snackbar.effects';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { LayoutUtilsService } from '../shared/modules/partials-module/LayoutUtilsService';
import { PartialsModule } from '../shared/modules/partials-module/partials-module';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import localePlExtra from '@angular/common/locales/extra/pl';
import { PartialComponentModule } from '../shared/partial-component/partial-component.module';
import {
  ActionNotificationComponent,
  DeleteEntityDialogComponent,
  FetchEntityDialogComponent,
  UpdateStatusDialogComponent
} from '../shared/modules/partials-module/content';
import { ProductEditDialogComponent } from './product-add/product-edit-dialog.component';
import { ProductResolver } from './resolver/product.resolver';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { PricelistEffects } from '../price-list/price-list.effects';
import { pricelistReducer } from '../price-list/reducers/pricelist.reducer';
import { PriceListResolver } from '../price-list/resolvers/priceList.resolver';
import { ProductPriceAddEditModalComponent } from './product-price-add-edit-modal/product-price-add-edit-modal.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
registerLocaleData(localePl);

@NgModule({
  declarations: [
    ProdCategoryComponent,
    ProductEditDialogComponent,
    ProductEditComponent,
    ProductViewComponent,
    ProductPriceAddEditModalComponent,
    ProductListComponent],
  imports: [
    MatDialogModule,
    PartialsModule,
    PartialComponentModule,
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CKEditorModule,
    EffectsModule.forFeature([ProductsEffects]),
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([SnackbarEffects]),
    EffectsModule.forFeature([PricelistEffects]),
    StoreModule.forFeature('pricelist', pricelistReducer)
  ], providers: [
    CategoryResolver,
    ProductResolver,
    PriceListResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        height: 'auto',
        width: '900px'
      }
    },
    LayoutUtilsService,
  ], entryComponents: [
    ActionNotificationComponent,
    DeleteEntityDialogComponent,
    FetchEntityDialogComponent,
    UpdateStatusDialogComponent,
    ProductEditDialogComponent,
    ProductPriceAddEditModalComponent
  ]
})
export class ProductsModule { }
