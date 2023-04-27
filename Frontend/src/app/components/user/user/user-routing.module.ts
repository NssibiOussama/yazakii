import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PcComponent } from './pc/pc.component';
import { PcProvisoireComponent } from './pc-provisoire/pc-provisoire.component';
import { LigneInternetComponent } from './ligne-internet/ligne-internet.component';

const routes: Routes = [
  {
    path:'pc' , component:PcComponent
  },
  {
    path:'pcProvisoire' , component:PcProvisoireComponent
  },
  {
    path:'ligne' , component:LigneInternetComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
