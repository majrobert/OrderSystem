import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, LOCALE_ID, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { reducers, metaReducers, AppState } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AccessDeniedComponent } from './layout/access-denied/access-denied.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { SnackbarEffects } from './shared/effects/snackbar.effects';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('root reducer');

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        MatSnackBarModule,
        StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        EffectsModule.forRoot([SnackbarEffects])

    ],
    declarations: [AppComponent, AccessDeniedComponent],
    providers: [AuthGuard, 
      { provide: LOCALE_ID, useValue: 'pl' },
      { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
      {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService ,
      multi: true,
    }],
    bootstrap: [AppComponent]
})
export class AppModule {}
