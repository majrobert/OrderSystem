import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductConfRoutingModule } from './product-conf-routing.module';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { PartialsModule } from '../shared/modules/partials-module/partials-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { LayoutUtilsService } from '../shared/modules/partials-module/LayoutUtilsService';
import { ActionNotificationComponent } from '../shared/modules/partials-module/content';
import { ProductConfEditModalComponent } from './product-conf-edit-modal/product-conf-edit-modal.component';
import { ProductConfEditComponent } from './product-conf-edit/product-conf-edit.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductsEffects } from '../products/products-state/products.effects';
import { productsReducer } from '../products/products-state/products.reducers';
import { SnackbarEffects } from '../shared/effects/snackbar.effects';
import { CategoryResolver } from '../products/resolver/categoryProd.resolver';
import { productConfReducer } from './state/procuctConf.reducer';
import { ProductsConfEffects } from './state/productConf.effects';
import { ProductConfResolver } from './resolver/ProductConfList.resolver';
import { PartialComponentModule } from '../shared/partial-component/partial-component.module';
import { ProductAddModalComponent } from './product-add-modal/product-add-modal.component';
import { ProductConfListComponent } from './product-conf-list/product-conf-list.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [  
    ProductConfEditModalComponent, 
    ProductConfEditComponent, ProductAddModalComponent, ProductConfListComponent,
  ],
  imports: [
    CommonModule,
    ProductConfRoutingModule,
    MatDialogModule,
    PartialsModule,
    PartialComponentModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CKEditorModule,
    EffectsModule.forFeature([ProductsEffects]),
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([SnackbarEffects]),
    StoreModule.forFeature('productconf', productConfReducer),
    EffectsModule.forFeature([ProductsConfEffects]),
  ], providers: [
    CategoryResolver,
    ProductConfResolver,
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
    ProductConfEditModalComponent,
    ProductAddModalComponent 
  ]
})
export class ProductConfModule { }
