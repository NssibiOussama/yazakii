import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { RoleService } from '../../../services/role.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css','../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css']
})
export class RolesComponent implements OnInit {


  formRole: FormGroup = new FormGroup({
    role: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  isFormSubmitted = false;
  action = 'Ajouter'
  listRoles: Role[] = []
  loading = false;
  inEdit = false;
  id: any;
  role: Role = new Role()


  constructor(
    private serviceRole: RoleService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loadForm()
    this.getRoles()
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.action = 'Modifier';
        this.inEdit = true;
        this.getById(params.get('id'));
      }
    });

  }
  get RoleControls(): { [key: string]: AbstractControl } {
    return this.formRole.controls;
  }



  loadForm() {
    this.formRole = this.formBuilder.group({
      role: [this.role.role, Validators.required],
    });

  }
  successNotification() {
    Swal.fire("", 'Supprimé avec succés!', 'success');

  }

    getRoles() {
      this.serviceRole.getRoles().subscribe((data:any) => this.listRoles = data)

    }

  onReset() {
    this.isFormSubmitted = false;
    this.formRole.reset();

  }
  edit() {
    this.action = 'Modifier'
    this.inEdit = true;
  }

  onSubmit() {
    this.isFormSubmitted = true
    if (this.formRole.invalid) {
      return;
    }
          this.serviceRole.addRole(this.formRole.value).subscribe(() => {
            Swal.fire('', 'Role ajouté avec succés', 'success');
            this.onReset()
            this.getRoles()
          }, () => Swal.fire('', 'Erreur', 'error'));

        }

  getById(id: any) {
    this.serviceRole.getRoleById(id).subscribe((response: any) => {
      if (response) {
        this.role = response[0];
        this.loadForm()
      }
    },
      (error) => Swal.fire('', 'Erreur', 'error'));
  }

  updateRole() {
    this.isFormSubmitted = true
    if (this.formRole.invalid) {
      return;
    }
          this.serviceRole.updateRole(this.id, this.formRole.value).subscribe(() => {
            Swal.fire('','Role modifié avec succés','success')
            this.onReset()
            this.getRoles()
            this.router.navigate(['/admin/roles']) });

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
        this.serviceRole.deleteRole(id).subscribe(
          (response: any) => {
            this.successNotification()
          },
          error => {
            Swal.fire('', 'Erreur', 'error')
          },
          () => {
            this.getRoles();
          }
        );
      }
    });
  }

}
