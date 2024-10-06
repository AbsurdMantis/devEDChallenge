import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../projects/auth/src/public-api';
import { MasterComponent } from './shared/master/master.component';
import { HomeComponent } from './shared/home/home.component';
import { AuthGuard } from '../../projects/auth/src/lib/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: MasterComponent,
        children: [
                    {
                      path: '',
                      component: HomeComponent,
                      canActivate: [AuthGuard]
                    },
                  ]
      },
      {
        path: '',
        children: [
                    {
                      path: 'login',
                      component: LoginComponent
                    }    
                  ]  
      }, 
      { 
        path: '**', 
        redirectTo: '' 
      } 
    
];
