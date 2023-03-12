import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.css']
})
export class PagesRegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  isFormSubmitted = false;
  nom!:string;
  prenom!:string;
  email!:string;
  password!:string;
  confirmPassword!:string;

  constructor(private authService: AuthService, private router: Router,private formBuilder: FormBuilder) {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => 
      {
        isLoggedIn && router.navigate(['/']);
        // (isLoggedIn && this.authService.user.role=='user') && router.navigate(['/user'])
      } )
   }

  ngOnInit(): void {
    this.loadForm()
  }
  get signupControls(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  loadForm() {
    this.registerForm = this.formBuilder.group({


      nom: [this.nom, [Validators.required, Validators.minLength(3)]],
      prenom: [this.prenom, [Validators.required,Validators.minLength(3)]],
      email: [this.email, [Validators.required,Validators.email]],
      password: [this.password, [Validators.required,Validators.minLength(8)]],
      confirmPassword: [this.confirmPassword, [Validators.required]]
    }, { 
      validator: ConfirmedValidator('password', 'confirmPassword')
    })}

  signup(){
    this.isFormSubmitted = true
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.signup(this.registerForm.value.nom, this.registerForm.value.prenom, this.registerForm.value.email, this.registerForm.value.password).subscribe((data) => {
      Swal.fire('Bienvenue !',' Votre compte a été creé avec succés.','success')
      this.router.navigate(['/login'])
    },
    err => Swal.fire('',err.error.msg,'error') )
  }


}
