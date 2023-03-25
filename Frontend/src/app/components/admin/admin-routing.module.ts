import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeComponent } from 'src/app/components/admin/commande/commande.component';
import { ScrapesComponent } from 'src/app/components/admin/scrapes/scrapes.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { MatComponent } from './mat/mat.component';
import { AmalComponent } from 'src/app/components/admin/amal/amal.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path:'',component:DashboardComponent,},
  {path:'mat' , component:MatComponent},
  { path: 'mat/edit/:id', component: MatComponent },
  { path: 'amal', component:AmalComponent },  
  { path: 'commande', component:CommandeComponent},
  { path: 'scrapes', component:ScrapesComponent},
  {path:'users',component:UsersComponent},
  {path:'users/edit/:id',component:UsersComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
