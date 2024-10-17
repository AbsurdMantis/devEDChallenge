import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  RegisterRequest,
  RegisterResponse,
} from '../../../../../src/app/app.interfaces';

export interface ApplicationUser {
  accessToken: string;
  expiresIn: Date;
  username: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<ApplicationUser | null>(null);

  constructor(private http: HttpClient, private snackModal: MatSnackBar) {}

  public get currentUserValue(): ApplicationUser | null {
    return this.currentUser();
  }

  Login(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/auth/login', { email, password }).pipe(
      map((user) => {
        if (user && user.accessToken) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
    );
  }

  retrieveUser(): void {
    const user = localStorage.getItem('currentUser');
    user ? this.currentUser.set(JSON.parse(user)) : this.currentUser.set(null);
  }

  Register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>('http://localhost:3000/auth/register', registerRequest)
      .pipe(
        tap((response: RegisterResponse) =>
          this.snackModal.open('User added to database', 'Close', {
            duration: 1000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          })
        )
      );
  }

  Logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
  }
}