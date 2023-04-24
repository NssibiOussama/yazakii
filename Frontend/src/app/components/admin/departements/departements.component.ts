import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from '../../../services/departement.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-departements',
  templateUrl: './departements.component.html',
  styleUrls: ['./departements.component.css','../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css']
})
export class DepartementsComponent implements OnInit {


  formDepartement: FormGroup = new FormGroup({
    dept: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  isFormSubmitted = false;
  action = 'Ajouter'
  listDepartements: Departement[] = []
  loading = false;
  inEdit = false;
  id: any;


  departement: Departement = new Departement()

  constructor(private serviceDepartement: DepartementService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loadForm()
    this.getDepartements()
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.action = 'Modifier';
        this.inEdit = true;
        this.getById(params.get('id'));
      }
    });

  }
  get DepartementControls(): { [key: string]: AbstractControl } {
    return this.formDepartement.controls;
  }



  loadForm() {
    this.formDepartement = this.formBuilder.group({
      dept: [this.departement.dept, Validators.required],
     
  
      
    });

  }
  successNotification() {
    Swal.fire("", 'Supprimé avec succés!', 'success');

  }

  getDepartements() {
    this.serviceDepartement.getDepartement().subscribe((data:any) => this.listDepartements = data)

  }
  onReset() {
    this.isFormSubmitted = false;
    this.formDepartement.reset();

  }
  edit() {
    this.action = 'Modifier'
    this.inEdit = true;
  }

  onSubmit() {
    this.isFormSubmitted = true
    if (this.formDepartement.invalid) {
      return;
    }
          this.serviceDepartement.addDepartement(this.formDepartement.value).subscribe(() => {
            Swal.fire('', 'Deaprtement ajouté avec succés', 'success');
            this.onReset()
            this.getDepartements()
          }, () => Swal.fire('', 'Erreur', 'error'));

        }

  getById(id: any) {
    this.serviceDepartement.getDepartementById(id).subscribe((response: any) => {
      if (response) {
        this.departement = response[0];
        this.loadForm()
      }
    },
      (error) => Swal.fire('', 'Erreur', 'error'));
  }

  updateDepartement() {
    this.isFormSubmitted = true
    if (this.formDepartement.invalid) {
      return;
    }
          this.serviceDepartement.updateDepartement(this.id, this.formDepartement.value).subscribe(() => {
            Swal.fire('','Materiel modifié avec succés','success')
            this.onReset()
            this.getDepartements()
            this.router.navigate(['/admin/departements']) });

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
        this.serviceDepartement.deleteDepartement(id).subscribe(
          (response: any) => {
            this.successNotification()
          },
          error => {
            Swal.fire('', 'Erreur', 'error')
          },
          () => {
            this.getDepartements();
          }
        );
      }
    });
  }
}
