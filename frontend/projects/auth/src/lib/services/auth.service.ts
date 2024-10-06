import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 

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

