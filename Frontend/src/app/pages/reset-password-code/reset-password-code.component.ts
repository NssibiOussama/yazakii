import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password-code',
  templateUrl: './reset-password-code.component.html',
  styleUrls: ['./reset-password-code.component.css']
})
export class ResetPasswordCodeComponent implements OnInit {
  email!:string
  formReset: FormGroup = new FormGroup({
    email: new FormControl(''),
    acceptTerms: new FormControl(false),
  });


  isFormSubmitted = false;
  constructor(private formBuilder: FormBuilder,private resetPasswordService:ResetPasswordService,private router: Router) { }

  ngOnInit(): void {
    this.loadForm()
  }
  get ResetControls(): { [key: string]: AbstractControl } {
    return this.formReset.controls;
  }
  successNotification() {
    Swal.fire("", 'Veuillez consulter votre boite mail', 'success');
  }
  loadForm() {
    this.formReset = this.formBuilder.group({
      email: [this.email, [Validators.required,Validators.email]],
    
    });

  }

  onSubmit() {
    this.isFormSubmitted = true
    if (this.formReset.invalid) {
      return;
    }

    this.resetPasswordService.resetCode(this.formReset.value).subscribe(
      (data: any) => {  
        this.isFormSubmitted=false 
        this.formReset.reset()
        this.successNotification() 
        this.router.navigateByUrl('/login')
      },(error) => {
        Swal.fire("", error.error.msg, 'error');
       });

    }


}
