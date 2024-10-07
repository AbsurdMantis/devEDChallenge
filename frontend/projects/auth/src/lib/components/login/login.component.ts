import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login', 
  standalone: true,
  templateUrl: 'login.component.html', 
  styleUrl:'login.component.scss',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule
  ],
})

export class LoginComponent implements OnInit {  
  loginForm!: FormGroup;  
  submitted = false;  
  returnUrl!: string;  
  error!: string;
    
    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthService) {}
    
    ngOnInit() {
        this.loginForm = new FormGroup({
          email: new FormControl(null, [Validators.required, Validators.email]),
          password: new FormControl(null, [Validators.required]),
         });
        this.authService.Logout();
        
        // get return url 
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';  
    }
    
    get f() { 
        return this.loginForm.controls; 
    }
    
    onSubmit() {
        this.submitted = true;
        
        // stop here if form is invalid    
        if (this.loginForm.invalid) {
            return;    
        }
        
        this.authService.Login(this.f['username'].value, this.f['password'].value)
        .pipe(first())
        .subscribe({
        next: data => {
            this.error = '';
            this.router.navigate([this.returnUrl || '/home']);
        },
        error: error => {
            this.error = error;
        }
    });
    }
}
