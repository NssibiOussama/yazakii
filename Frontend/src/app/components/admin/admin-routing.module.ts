import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrapesComponent } from 'src/app/components/admin/scrapes/scrapes.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { MatComponent } from './mat/mat.component';
import { UsersComponent } from './users/users.component';
import { DepartementsComponent } from './departements/departements.component';
import { RolesComponent } from './roles/roles.component';


const routes: Routes = [
  { path:'',component:DashboardComponent,},
  {path:'mat' , component:MatComponent},
  { path: 'mat/edit/:id', component: MatComponent },
  { path: 'scrapes', component:ScrapesComponent},
  {path:'users',component:UsersComponent},
  {path:'users/edit/:id',component:UsersComponent},
  {path:'departements',component:DepartementsComponent},
  {path:'departements/edit/:id',component:DepartementsComponent},
  {path:'roles',component:RolesComponent},
  {path:'roles/edit/:id',component:RolesComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
