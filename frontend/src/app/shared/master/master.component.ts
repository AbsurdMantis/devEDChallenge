import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../projects/auth/src/public-api';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss'
})

export class MasterComponent implements OnInit {  
  public loggedIn = false;

  constructor(private readonly authService: AuthService, private readonly router: Router  ) {}

  ngOnInit() {
      this.loggedIn = !!this.authService.currentUserValue;  
  }
  
  public Logout(): void {
      this.authService.Logout();
      this.router.navigate(['/login']);  
  }
}
