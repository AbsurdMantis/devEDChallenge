import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { RegisterRequest, RegisterResponse } from '../../../../../src/app/app.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ApplicationUser {
	accessToken: string;
	expiresIn: Date;
	username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<ApplicationUser | null>;

  public currentUser: Observable<ApplicationUser | null>;

  constructor(private http: HttpClient, private snackModal: MatSnackBar) { 
    const userJson = localStorage.getItem('currentUser');
    const user = userJson ? JSON.parse(userJson) : null;

    this.currentUserSubject = new BehaviorSubject<ApplicationUser | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): ApplicationUser | null {
    return this.currentUserSubject.value;
  }

  Login(email: string, password: string ){
    return this.http.post<any>('/auth/login', { email, password }).pipe(map(user => {
      if (user && user.accessToken) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);       
      }
      return user;
    }));
  }

  Register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('/api/auth/register', registerRequest).pipe(
      tap((response: RegisterResponse) => 
        this.snackModal.open('User added to database', 'Close', 
        { duration: 1000, horizontalPosition: 'right', verticalPosition: 'top' })
      )
    );
  }

  Logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}