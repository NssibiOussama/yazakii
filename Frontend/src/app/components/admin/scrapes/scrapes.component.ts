import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Materiel } from 'src/app/models/materiel.model';
import { MaterielsService } from '../../../services/materiels.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-scrapes',
  templateUrl: './scrapes.component.html',
  styleUrls: ['./scrapes.component.css','../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css']
})
export class ScrapesComponent implements OnInit {

  listScrapeMateriels: Materiel[] = []
  id: any;


  materiel: Materiel = new Materiel()

  constructor(private serviceMateriel: MaterielsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getMateriels()
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.getById(params.get('id'));
      }
    });

  }





  successNotification() {
    Swal.fire("", 'Supprimé avec succés!', 'success');

  }


  getMateriels() {
    this.serviceMateriel.getScrapeMateriel().subscribe((data) =>{ this.listScrapeMateriels = data
    ;
    })

  }




      
   
  

  getById(id: any) {
    this.serviceMateriel.getMaterielById(id).subscribe((response: any) => {
      if (response) {
        this.materiel = response[0];
      }
    },
      (error) => Swal.fire('', 'Erreur', 'error'));
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
        this.serviceMateriel.updateScrape2(id).subscribe(
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
