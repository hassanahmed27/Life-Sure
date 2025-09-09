
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'https://tuliptowers.pk/api/Account/register';
  private loginUrl = 'https://tuliptowers.pk/api/Token/login';

  constructor(private http: HttpClient) {
    console.log('AuthService initialized');
  }

  register(user: User): Observable<any> {
    console.log('Registering user:', user);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.registerUrl, user, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    console.log('Logging in with:', credentials);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.loginUrl, credentials, { headers })
      .pipe(
        catchError(this.handleLoginError)
      );
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {

      errorMessage = `Error: ${error.error.message}`;
    } else {

      if (error.status === 409) {
        errorMessage = 'User already registered with this email or identity number';
      } else if (error.status === 400) {
        errorMessage = 'Invalid data provided';
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }

  private handleLoginError(error: any) {
    let errorMessage = 'An unknown error occurred during login!';
    if (error.error instanceof ErrorEvent) {

      errorMessage = `Error: ${error.error.message}`;
    } else {

      if (error.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.status === 400) {
        errorMessage = 'Please provide both email and password';
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }
}