/// <reference types="@angular/localize" />

import { enableProdMode, importProvidersFrom, inject, provideAppInitializer } from '@angular/core';

import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';
import { catchError, firstValueFrom, of } from 'rxjs';
import { AuthService } from './app/core/services/auth.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return firstValueFrom(authService.refreshToken().pipe(catchError(() => of(null))));
    }),
    importProvidersFrom(BrowserModule, AppRoutingModule)]
}).catch((err) => console.error(err));
