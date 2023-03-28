import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import Swal from 'sweetalert2';
import { ConfirmedValidator } from './confirmed.validator';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  code : any
  formPassword: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });

  isFormSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private resetPasswordService:ResetPasswordService,
    private router: Router,
    private ac: ActivatedRoute,
    ) { }

  ngOnInit(): void {
     this.loadForm()
    this.code = this.ac.snapshot.params['code']    

  }
  get passworsControls() {
    return this.formPassword.controls;
  }
  successNotification() {
    Swal.fire("", 'Mot de passe Modifié avec Sucées', 'success');
  }
  errorNotification() {
    Swal.fire("", 'Code de validation incorrect !', 'error');
  }
  loadForm() {
    this.formPassword = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    
    }, { 
      validator: ConfirmedValidator('password', 'confirmPassword')
    });

  }

  onSubmit(){
    this.isFormSubmitted = true
    if (this.formPassword.invalid) {
      return;
    }
    console.log(this.code);
    // this.successNotification()
    this.resetPasswordService.updatePassword(this.code,this.formPassword.value.password).subscribe((data)=>{
      this.successNotification()
      this.router.navigateByUrl('/login')
    },(error)=>{
      this.errorNotification()
    })
    

  }

}
