import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({ 
  standalone: true,
  templateUrl: 'login.component.html', 
  styleUrl:'login.component.css',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
})

export class LoginComponent implements OnInit {  
  loginForm!: FormGroup;  
  submitted = false;  
  returnUrl!: string;  
  error!: string;
    
    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthService) {}
    
    ngOnInit() {
        this.loginForm = this.formBuilder.group({ 
        username: ['', Validators.required],
        password: ['', Validators.required]
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
            this.router.navigate([this.returnUrl || '/']);
        },
        error: error => {
            this.error = error;
        }
    });
    }
}
