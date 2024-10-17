import { Component } from '@angular/core';
import { PasswordValidator } from '../../services/password.validator';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterRequest } from '../../../../../../src/app/app.interfaces';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    firstname: new FormControl<string | null>(null, [Validators.required]),
    lastname: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [Validators.required]),
    passwordConfirm: new FormControl<string | null>(null, [Validators.required])
  },
    { validators: PasswordValidator.passwordsMatching }
  )

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  register() {

    if (!this.registerForm.valid) {
      return;
    }

    const formValue = this.registerForm.value;

    const registerData: RegisterRequest = {
      email: formValue.email!,
      name: formValue.firstname! + " " + formValue.lastname!,
      password: formValue.password!,
    };

    this.authService.Register(registerData).pipe(
      tap(() => this.router.navigate(['/login']))
    ).subscribe();
  }
}
