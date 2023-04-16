import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Materiel } from 'src/app/models/materiel.model';
import { MaterielsService } from '../../../services/materiels.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat',
  templateUrl: './mat.component.html',
  styleUrls: ['./mat.component.css','../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css']
})
export class MatComponent implements OnInit {

  formMaeriel: FormGroup = new FormGroup({
    asset: new FormControl(''),
    sub_asset: new FormControl(''),
    inv_method: new FormControl(''),
    date: new FormControl(''),
    sn: new FormControl(''),
    user_id: new FormControl(''),
    location: new FormControl(''),
    remarque: new FormControl(''),
    cc: new FormControl(''),
    asset_description : new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  isFormSubmitted = false;
  action = 'Ajouter'
  listMateriels: Materiel[] = []
  loading = false;
  inEdit = false;
  id: any;
  listUsers: any[] = []


  materiel: Materiel = new Materiel()

  constructor(private serviceMateriel: MaterielsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  currentDate:any=new Date();
  ngOnInit(): void {
    this.loadForm()
    this.getMateriels()
    this.getUsers()
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.action = 'Modifier';
        this.inEdit = true;
        this.getById(params.get('id'));
      }
    });

  }
  get materielControls(): { [key: string]: AbstractControl } {
    return this.formMaeriel.controls;
  }



  loadForm() {
    this.formMaeriel = this.formBuilder.group({
      asset: [this.materiel.asset, Validators.required],
      sub_asset: [this.materiel.sub_asset, Validators.required],
      inv_method: [this.materiel.inv_method, Validators.required],
      date: [this.materiel.date, Validators.required],
      sn: [this.materiel.sn, Validators.required],
      user_id: [this.materiel.user_id, Validators.required],
      location: [this.materiel.location, Validators.required],
      remarque: [this.materiel.remarque, Validators.required],
      cc: [this.materiel.cc, Validators.required],
      asset_description: [this.materiel.asset_description, Validators.required],
  
      
    });

  }
  successNotification() {
    Swal.fire("", 'Supprimé avec succés!', 'success');

  }
  getUsers() {
    this.serviceMateriel.getUsers().subscribe((data) => this.listUsers = data)

  }

  getMateriels() {
    this.serviceMateriel.getMateriel().subscribe((data) => this.listMateriels = data)

  }
  onReset() {
    this.isFormSubmitted = false;
    this.formMaeriel.reset();

  }
  edit() {
    this.action = 'Modifier'
    this.inEdit = true;
  }

  onSubmit() {
    this.isFormSubmitted = true
    if (this.formMaeriel.invalid) {
      return;
    }
      this.materiel.asset = this.formMaeriel.value.asset
      this.materiel.sub_asset = this.formMaeriel.value.sub_asset
      this.materiel.inv_method = this.formMaeriel.value.inv_method
      this.materiel.date = this.formMaeriel.value.date
      this.materiel.sn = this.formMaeriel.value.sn
      this.materiel.user_id = this.formMaeriel.value.user_id
      this.materiel.location = this.formMaeriel.value.location
      this.materiel.remarque = this.formMaeriel.value.remarque
      this.materiel.cc = this.formMaeriel.value.cc
      this.materiel.asset_description = this.formMaeriel.value.asset_description

 
   
   
          this.serviceMateriel.addMateriel(this.materiel).subscribe(data => {
            Swal.fire('', 'Materiel ajouté avec succés', 'success');
           
            this.onReset()
            this.getMateriels()
          }, (error) => Swal.fire('', 'Erreur', 'error'));

        }
      
   
  

  getById(id: any) {
    this.serviceMateriel.getMaterielById(id).subscribe((response: any) => {
      if (response) {
        this.materiel = response[0];
        console.log(this.materiel)
        this.loadForm()
      }
    },
      (error) => Swal.fire('', 'Erreur', 'error'));
  }

  updateMateriel() {
    this.isFormSubmitted = true
    if (this.formMaeriel.invalid) {
      return;
    }
    


          this.serviceMateriel.updateMateriel(this.id, this.formMaeriel.value).subscribe(data => {
            Swal.fire('','Materiel modifié avec succés','success')
            this.onReset()
            this.getMateriels()
            this.router.navigate(['/admin/mat']) });

        }
 
  delete(id: any) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprime-le!',
      cancelButtonText: 'Non, annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceMateriel.deleteMateriel(id).subscribe(
          (response: any) => {
            this.successNotification()
          },
          error => {
            Swal.fire('', 'Erreur', 'error')
          },
          () => {
            this.getMateriels();
          }
        );
      }
    });
  }
  scrape(id : any){
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui,!',
      cancelButtonText: 'Non, annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceMateriel.updateScrape(id).subscribe(
          (response: any) => {
            Swal.fire("", 'Modifié avec succés!', 'success');
          },
          error => {
            Swal.fire('', 'Erreur', 'error')
          },
          () => {
            this.getMateriels();
          }
        );
      }
    });
    
  }


}
