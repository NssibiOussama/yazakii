import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { HasRoleGuard } from './services/hasRole.guard';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { AdminComponent } from './layouts/AdminLayout/admin/admin.component';
import { UserComponent } from './layouts/AdminLayout/user/user.component';
import { ResetPasswordCodeComponent } from './pages/reset-password-code/reset-password-code.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';



const routes: Routes = [
 
  {
    path: 'admin', component: AdminComponent, canActivate: [HasRoleGuard], data: { role: ['admin'] },
    children: [
      { path: '', loadChildren: () => import('./components/admin/admin.module').then(module => module.AdminModule) }
    ],
    title:'Admin dashboard'
  },
  {
    path: 'user', component: UserComponent, canActivate: [HasRoleGuard], data: { role: ['user'] },
    children: [
      { path: '', loadChildren: () => import('./components/user/user/user.module').then(module => module.UserModule) }
    ],
    title:'User dashboard'
  },
  { path: 'pages-401', component: PagesBlankComponent },
  { path: '', component: PagesLoginComponent },

  { path: 'login', component: PagesLoginComponent },
  { path: 'resetPwd', component: ResetPasswordCodeComponent },
  { path: 'updatePwd/:code', component: UpdatePasswordComponent },






];

@NgModule({
  imports: [RouterModule.forRoot(routes,)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
