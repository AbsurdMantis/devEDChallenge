import { Routes} from '@angular/router';
import { LoginComponent, RegisterComponent } from '../../projects/auth/src/public-api';
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
        path: '',
        children: [
                    {
                      path: 'register',
                      component: RegisterComponent
                    }    
                  ]  
      },  
      { 
        path: '**', 
        redirectTo: '' 
      } 
    
];
