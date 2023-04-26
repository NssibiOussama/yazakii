import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PcService } from 'src/app/services/pc.service';
import { Role } from 'src/app/models/role.model';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement.service';
import { RoleService } from 'src/app/services/role.service';
import { pc } from 'src/app/models/pc.model';
@Component({
  selector: 'app-pc',
  templateUrl: './pc.component.html',
  styleUrls: ['./pc.component.css']
})
export class PcComponent implements OnInit {
  demandeForm: FormGroup = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    departement_id: new FormControl(''),
    fonction: new FormControl(''),
    appareil: new FormControl(''),
    motif: new FormControl(''),
    acceptTerms: new FormControl(false),


  });
  isFormSubmitted = false;
  action = 'Ajouter'
  inEdit = false;
  id: any;
  listRoles: Role[] = []
  listDepartements: Departement[] = []
  pc : pc = new pc()





  constructor( private router: Router,private formBuilder: FormBuilder,private serviceDemande: PcService,private serviceRole: RoleService,private serviceDepartement :DepartementService
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


      nom: [this.pc.nom, Validators.required],
      prenom: [this.pc.prenom, Validators.required],
      departement_id: [this.pc.departement_id, Validators.required],
      fonction: [this.pc.fonction, Validators.required],
      appareil: [this.pc.appareil, Validators.required],
      motif: [this.pc.motif, Validators.required],
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
