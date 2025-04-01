import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://companiesapi-f3exbbd6add9fqce.canadacentral-01.azurewebsites.net/api/auth'; // API URL
  private tokenKey = 'authToken';
  private refreshTokenKey = 'refreshToken';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ accessToken: string; refreshToken: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          if (response.accessToken || response.refreshToken) {
            localStorage.setItem(this.tokenKey, response.accessToken);
            localStorage.setItem(this.refreshTokenKey, response.refreshToken);
            this.authStatus.next(true);
            return true;
          }
          return false;
        })
      );
  }

  register(email: string, password: string): Observable<boolean> {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/register`, { email, password })
      .pipe(
        map(response => response.success),
        catchError(error => this.handleError(error))
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  refreshToken(): Observable<string> {
    return this.http.post<{ accessToken: string; refreshToken: string }>(
      `${this.apiUrl}/refresh-token`,
      { refreshToken: this.getRefreshToken() }
    ).pipe(
      map(response => {
        if (response.accessToken) {
          localStorage.setItem(this.tokenKey, response.accessToken);
        }
        if (response.refreshToken) {
          localStorage.setItem(this.refreshTokenKey, response.refreshToken);
        }
        return response.accessToken;
      }),
      catchError(error => {
        this.logout();  // If refresh fails, log out
        return new Observable<string>(observer => observer.error(error));
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Authentication error:', error);
    return new Observable<never>(observer => observer.error(error));
  }
}
