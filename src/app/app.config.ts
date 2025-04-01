import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'company/:id', component: CompanyDetailsComponent } 
];

export const appConfig = {
  providers: [provideHttpClient()],
  routes: appRoutes 
};


