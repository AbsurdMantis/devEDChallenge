import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { AuthService, jwtInterceptorProvider, errorInterceptorProvider, AuthGuard, LoginComponent } from '../projects/auth/src/public-api';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), 
    jwtInterceptorProvider,
    errorInterceptorProvider,
    provideRouter(routes), // Include your routes if any
  ],
}).catch(err => console.error(err));