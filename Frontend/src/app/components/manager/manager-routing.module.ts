import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandePcComponent } from './demande-pc/demande-pc.component';
import { DemandePcProvisoireComponent } from './demande-pc-provisoire/demande-pc-provisoire.component';
import { DemandeLigneInternetComponent } from './demande-ligne-internet/demande-ligne-internet.component';

const routes: Routes = [
  {
    path:'demandepc' , component:DemandePcComponent
  },
  {
    path:'demandepcprovisoire' , component:DemandePcProvisoireComponent
  },
  {
    path:'demandeligneinternet' , component:DemandeLigneInternetComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
