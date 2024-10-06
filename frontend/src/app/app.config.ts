import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { errorInterceptorProvider, jwtInterceptorProvider } from '../../projects/auth/src/public-api';

export const appConfig: ApplicationConfig = {
  providers: [ provideHttpClient(), 
    jwtInterceptorProvider,
    errorInterceptorProvider,provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration()]
};
