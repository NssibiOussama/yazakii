import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ScrapesComponent } from 'src/app/components/admin/scrapes/scrapes.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { MatComponent } from './mat/mat.component';
import { AmalComponent } from 'src/app/components/admin/amal/amal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { DepartementsComponent } from './departements/departements.component';
import { RolesComponent } from './roles/roles.component';


@NgModule({
  declarations: [
    ScrapesComponent,
    DashboardComponent,
    MatComponent,
    AmalComponent,
    UsersComponent,
    DepartementsComponent,
    RolesComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
