import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DemandeService } from 'src/app/services/demande.service';
import { Demande } from 'src/app/models/demande.model';


@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {


  registerForm: FormGroup = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    description: new FormControl(''),
    user_id : new FormControl('')

  });
  isFormSubmitted = false;
  demande: Demande = new Demande()

  constructor(private authService: AuthService, private router: Router,private formBuilder: FormBuilder,private serviceDemande: DemandeService,private route: ActivatedRoute,
    ) {
   
   }

  ngOnInit(): void {
    this.loadForm()
  }
  get signupControls(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  loadForm() {
    this.registerForm = this.formBuilder.group({


      nom: [this.demande.nom, [Validators.required, Validators.minLength(3)]],
      prenom: [this.demande.prenom, [Validators.required,Validators.minLength(3)]],
      email: [this.demande.email, [Validators.required,Validators.email]],
      description: [this.demande.description, Validators.required],
      user_id : [this.authService.user.userId]
    })}
    onReset() {
      this.isFormSubmitted = false;
      this.registerForm.reset();
  
    }
    onSubmit() {
      this.isFormSubmitted = true
      if (this.registerForm.invalid) {
        return;
      }
            this.serviceDemande.demande(this.registerForm.value,this.authService.user.userId).subscribe(data => {
              Swal.fire('', 'Materiel ajouté avec succés', 'success');
             
              this.onReset()
            }, (error) => Swal.fire('', 'Erreur', 'error'));
  
          }

}
