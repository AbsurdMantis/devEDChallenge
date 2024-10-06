import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface ApplicationUser {
	accessToken: string;
	expiresIn: Date;
	username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<ApplicationUser>;
	public currentUser: Observable<ApplicationUser>;

  constructor(private readonly http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<ApplicationUser>(
			JSON.parse(localStorage.getItem('currentUser'))
		);
		this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): ApplicationUser {
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
  
  Logout(){
    localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
  }
}

