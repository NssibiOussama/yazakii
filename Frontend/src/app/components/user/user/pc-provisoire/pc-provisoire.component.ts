import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PcProvisoireService } from 'src/app/services/pc-provisoire.service';
import { Role } from 'src/app/models/role.model';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement.service';
import { RoleService } from 'src/app/services/role.service';
import { pcProvisoire } from 'src/app/models/pcProvisoire.model';
@Component({
  selector: 'app-pc-provisoire',
  templateUrl: './pc-provisoire.component.html',
  styleUrls: ['./pc-provisoire.component.css']
})
export class PcProvisoireComponent implements OnInit {
  demandeForm: FormGroup = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    departement_id: new FormControl(''),
    fonction: new FormControl(''),
    appareil: new FormControl(''),
    motif: new FormControl(''),
    du: new FormControl(''),
    judqua: new FormControl(''),
    acceptTerms: new FormControl(false),


  });
  isFormSubmitted = false;
  action = 'Ajouter'
  inEdit = false;
  id: any;
  listRoles: Role[] = []
  listDepartements: Departement[] = []
  pc : pcProvisoire = new pcProvisoire()
  currentDate:any=new Date();





  constructor( private router: Router,private formBuilder: FormBuilder,private serviceDemande: PcProvisoireService,private serviceRole: RoleService,private serviceDepartement :DepartementService
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
      du: [this.pc.du, Validators.required],
      jusqua: [this.pc.jusqua, Validators.required],
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
