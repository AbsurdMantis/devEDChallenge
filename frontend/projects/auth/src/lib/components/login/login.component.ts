import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})

export class LoginComponent implements OnInit {
  submitted = false;
  returnUrl!: string;
  error!: string;
  private authService = inject(AuthService);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
}); 

  ngOnInit() {
    this.authService.Logout();

    // get return url
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    const formControls = this.loginForm.value;
    const { email, password } = formControls;
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .Login(email, password)

      .pipe(first())
      .subscribe({
        next: (data) => {
          this.error = '';
          this.router.navigate([this.returnUrl || '/home']);
        },
        error: (error) => {
          this.error = error;
        },
      });
  }
}