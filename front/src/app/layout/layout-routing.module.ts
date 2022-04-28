import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'pricelist', loadChildren: () => import('../price-list/price-list.module').then(m => m.PriceListModule) },
            { path: 'productconf', loadChildren: () => import('../product-conf/product-conf.module').then(m => m.ProductConfModule) },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule) },
            { path: 'products', loadChildren: () => import('../products/products.module').then(m => m.ProductsModule) },
            { path: 'customers', loadChildren: () => import('../customers/customers.module').then(m => m.CustomersModule) },
            { path: 'offers', loadChildren: () => import('../offers/offers.module').then(m => m.OffersModule) },
            { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) },
            { path: 'not-found', component: NotFoundComponent },
            { path: 'error', component: ServerErrorComponent },
            { path: '**', redirectTo: 'not-found' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
