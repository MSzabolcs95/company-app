import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { CompanyDetailsComponent } from './app/company-details/company-details.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompanyList } from './app/company-list/company-list.component';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { LoginComponent } from './app/login/login.component';  // Import your AuthComponent
import { RegisterComponent } from './app/register/register.component';
import { CompanyFormComponent } from './app/company-form/company-form.component';

const routes = [
  { path: 'company/:id', component: CompanyDetailsComponent }, 
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'list', component: CompanyList},
  { path: 'company-form/:id', component: CompanyFormComponent},
  { path: 'company-form', component: CompanyFormComponent}
 
]

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    importProvidersFrom(RouterModule),
  ]
  
}).catch(err => console.error(err));