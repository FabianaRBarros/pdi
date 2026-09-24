import { provideHttpClient } from '@angular/common/http'
import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    })
  ]
};
