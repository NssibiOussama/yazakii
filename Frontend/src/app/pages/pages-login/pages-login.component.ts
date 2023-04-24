import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {
title="Connexion"
  formLogin: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  isFormSubmitted = false;

  email!:string;
  password!:string;

  constructor(private authService: AuthService, private router: Router,private formBuilder: FormBuilder,
    ) {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => 
      {      
        isLoggedIn && router.navigate([`/`]);
      } )
   }

  ngOnInit(): void {
    this.loadForm();
  
  }
  get loginControls(): { [key: string]: AbstractControl } {
    return this.formLogin.controls;
  }
  loadForm() {
    this.formLogin = this.formBuilder.group({


      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, Validators.required],
    })}

  login(){
    this.isFormSubmitted = true
    if (this.formLogin.invalid) {
      return;
    }
    this.authService.login(this.formLogin.value.email,this.formLogin.value.password).subscribe((data) => {
      console.log(this.authService.user);
      if (this.authService.user.role == 'Administrateur' || this.authService.user.role == 'Manager') {
        this.router.navigate(['/admin'])

        
      } else {
        this.router.navigate(['/user'])

        
      }
      
      
    },
    err => Swal.fire('','Adresse ou mot de passe incorrecte ! ','error'))
  }

}
