import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LigneInternetService } from 'src/app/services/ligne-internet.service';
import { Role } from 'src/app/models/role.model';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement.service';
import { RoleService } from 'src/app/services/role.service';
import { ligneInternet } from 'src/app/models/demandeLigneInternet.model';

@Component({
  selector: 'app-ligne-internet',
  templateUrl: './ligne-internet.component.html',
  styleUrls: ['./ligne-internet.component.css','../../../../../assets/integration/assets/vendor/css/core.css', '../../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../../assets/integration/assets/css/demo.css', '../../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css']
})
export class LigneInternetComponent implements OnInit {
  demandeForm: FormGroup = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    departement_id: new FormControl(''),
    fonction: new FormControl(''),
    appareil: new FormControl(''),
    forfait: new FormControl(''),
    acceptTerms: new FormControl(false),


  });
  isFormSubmitted = false;
  action = 'Ajouter'
  inEdit = false;
  id: any;
  listRoles: Role[] = []
  listDepartements: Departement[] = []
  ligneInternet : ligneInternet = new ligneInternet()





  constructor( private router: Router,private formBuilder: FormBuilder,private serviceDemande: LigneInternetService,private serviceRole: RoleService,private serviceDepartement :DepartementService
    ) {
   
   }

  ngOnInit(): void {
    this.loadForm()
    this.getRoles()
    this.getDepartements()

  }
  getRoles() {
    this.serviceRole.getRoles().subscribe((data:any) => this.listRoles = data)

  }
  getDepartements() {
    this.serviceDepartement.getDepartement().subscribe((data:any) => this.listDepartements = data)

  }

  get demandeControls(): { [key: string]: AbstractControl } {
    return this.demandeForm.controls;
  }
  loadForm() {
    this.demandeForm = this.formBuilder.group({


      nom: [this.ligneInternet.nom, Validators.required],
      prenom: [this.ligneInternet.prenom, Validators.required],
      departement_id: [this.ligneInternet.departement_id, Validators.required],
      fonction: [this.ligneInternet.fonction, Validators.required],
      appareil: [this.ligneInternet.appareil, Validators.required],
      forfait: [this.ligneInternet.forfait, Validators.required],
    })}
    onReset() {
      this.isFormSubmitted = false;
      this.demandeForm.reset();
  
    }
    onSubmit(){
    this.isFormSubmitted = true
    if (this.demandeForm.invalid) {
      return;
    }
    this.serviceDemande.addDemande(this.demandeForm.value).subscribe((data) => {
      Swal.fire("",'  Demande envoyé avec succés.','success')
      this.onReset()
    },
    err => Swal.fire('','Error','error') )
  }


  
     
}
