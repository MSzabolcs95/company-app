import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; // Import Router

export interface Company {
  id: string;
  name: string;
  ticker: string;
  exchange: string;
  isin: string;
  website?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = 'https://companiesapi-f3exbbd6add9fqce.canadacentral-01.azurewebsites.net/api/companies';  

  constructor(
    private http: HttpClient,
    private router: Router // Inject Router
  ) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  private handleUnauthorizedError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // Redirect to the home page on 401 Unauthorized error
      this.router.navigate(['/']);
    }
    return throwError(() => new Error(error.message));
  }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError((error) => this.handleUnauthorizedError(error))
    );
  }

  getCompanyById(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => this.handleUnauthorizedError(error))
    );
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, company, { headers: this.getHeaders() }).pipe(
      catchError((error) => this.handleUnauthorizedError(error))
    );
  }

  updateCompany(id: string, company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.apiUrl}/${id}`, company, { headers: this.getHeaders() }).pipe(
      catchError((error) => this.handleUnauthorizedError(error))
    );
  }

  getCompanyByIsin(isin: string): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/isin/${isin}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => this.handleUnauthorizedError(error))
    );
  }
}
