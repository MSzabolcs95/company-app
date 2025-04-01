import { Routes } from '@angular/router';
import { CompanyDetailsComponent } from './company-details/company-details.component';

export const routes: Routes = [{ path: 'company/:id', component: CompanyDetailsComponent }];
