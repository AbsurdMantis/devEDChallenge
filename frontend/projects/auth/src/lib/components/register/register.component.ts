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

@Component({
  selector: 'lib-register',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required]),
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required])
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
      username: formValue.username!,
      firstname: formValue.firstname!,
      lastname: formValue.lastname!,
      password: formValue.password!,
    };

    this.authService.Register(registerData).pipe(
      tap(() => this.router.navigate(['/login']))
    ).subscribe();
  }
}
