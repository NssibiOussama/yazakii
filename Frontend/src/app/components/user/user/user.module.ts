import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommandesComponent } from './commandes/commandes.component';
import { PcComponent } from './pc/pc.component';
import { PcProvisoireComponent } from './pc-provisoire/pc-provisoire.component';
import { LigneInternetComponent } from './ligne-internet/ligne-internet.component';



@NgModule({
  declarations: [
    CommandesComponent,
    PcComponent,
    PcProvisoireComponent,
    LigneInternetComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
