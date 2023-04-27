import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { DemandeLigneInternetComponent } from './demande-ligne-internet/demande-ligne-internet.component';
import { DemandePcComponent } from './demande-pc/demande-pc.component';
import { DemandePcProvisoireComponent } from './demande-pc-provisoire/demande-pc-provisoire.component';


@NgModule({
  declarations: [
    DemandeLigneInternetComponent,
    DemandePcComponent,
    DemandePcProvisoireComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
