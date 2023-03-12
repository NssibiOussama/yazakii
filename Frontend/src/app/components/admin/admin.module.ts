import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CommandeComponent } from 'src/app/components/admin/commande/commande.component';
import { ScrapesComponent } from 'src/app/components/admin/scrapes/scrapes.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { MatComponent } from './mat/mat.component';
import { AmalComponent } from 'src/app/components/admin/amal/amal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CommandeComponent,
    ScrapesComponent,
    DashboardComponent,
    MatComponent,
    AmalComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
