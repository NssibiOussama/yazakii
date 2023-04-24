import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from 'src/app/services/users.service';
import { Role } from 'src/app/models/role.model';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement.service';
import { RoleService } from 'src/app/services/role.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css','../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css']
})
export class UsersComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    departement: new FormControl(''),

  });
  isFormSubmitted = false;
  nom!:string;
  prenom!:string;
  email!:string;
  role!:string;
  departement!:number;
  action = 'Ajouter'
  inEdit = false;
  listUsers: any[] = []
  id: any;
  listRoles: Role[] = []
  listDepartements: Departement[] = []





  constructor(private authService: AuthService, private router: Router,private formBuilder: FormBuilder,private serviceUser: UsersService,private route: ActivatedRoute,private serviceRole: RoleService,private serviceDepartement :DepartementService
    ) {
   
   }

  ngOnInit(): void {
    this.loadForm()
    this.getUsers()
    this.getRoles()
    this.getDepartements()
    this.getDepartements
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.action = 'Modifier';
        this.inEdit = true;
        this.getById(params.get('id'));
      }
    });
  }
  getRoles() {
    this.serviceRole.getRoles().subscribe((data:any) => this.listRoles = data)

  }
  getDepartements() {
    this.serviceDepartement.getDepartement().subscribe((data:any) => this.listDepartements = data)

  }
  successNotification() {
    Swal.fire("", 'Supprimé avec succés!', 'success');

  }

  get signupControls(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  loadForm() {
    this.registerForm = this.formBuilder.group({


      nom: [this.nom, [Validators.required, Validators.minLength(3)]],
      prenom: [this.prenom, [Validators.required,Validators.minLength(3)]],
      email: [this.email, [Validators.required,Validators.email]],
      role: [this.role, Validators.required],
      departement: [this.departement, Validators.required],
    })}
    onReset() {
      this.isFormSubmitted = false;
      this.registerForm.reset();
  
    }
  signup(){
    this.isFormSubmitted = true
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.signup(this.registerForm.value.nom, this.registerForm.value.prenom, this.registerForm.value.email, this.registerForm.value.role,this.registerForm.value.departement).subscribe((data) => {
      Swal.fire("",'  compte a été creé avec succés.','success')
      this.getUsers()
      this.onReset()
    },
    err => Swal.fire('',err.error.msg,'error') )
  }
  getUsers() {
    this.serviceUser.getUsers().subscribe((data) => this.listUsers = data)

  }

  delete(id:any){
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
        this.serviceUser.deleteUser(id).subscribe(
          (response: any) => {
            this.successNotification()
          },
          error => {
            Swal.fire('', 'Erreur', 'error')
          },
          () => {
            this.getUsers();
          }
        );
      }
    });

  }
  edit() {
    this.action = 'Modifier'
    this.inEdit = true;
  }

  getById(id: any) {
    this.serviceUser.getUserById(id).subscribe((response: any) => {
      if (response) {
        this.prenom = response[0].first_name;
        this.nom = response[0].last_name;
        this.email = response[0].email;
        this.role = response[0].role;
        this.loadForm()
      }
    },
      (error) => Swal.fire('', 'Erreur', 'error'));
  }

  updqteUser() {
    this.isFormSubmitted = true
    if (this.registerForm.invalid) {
      return;
    }
          this.serviceUser.updateUser(this.id, this.registerForm.value.prenom,this.registerForm.value.nom,this.registerForm.value.email,this.registerForm.value.role).subscribe(data => {
            Swal.fire('','Utilisateur modifié avec succés','success')
            this.onReset()
            this.getUsers()
            this.router.navigate(['/admin/users']) 
          });
        }
}
