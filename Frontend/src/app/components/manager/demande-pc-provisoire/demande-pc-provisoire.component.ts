import { Component, OnInit } from '@angular/core';
import { pcProvisoire } from 'src/app/models/pcProvisoire.model';
import { DemandeService } from '../../../services/demande.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-pc-provisoire',
  templateUrl: './demande-pc-provisoire.component.html',
  styleUrls: ['./demande-pc-provisoire.component.css','../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css']
})
export class DemandePcProvisoireComponent implements OnInit {
  listDemandePcProvosoire: pcProvisoire[] = []

  constructor(private serviceDemande: DemandeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getDemandesPcProvosoire()
  }
  getDemandesPcProvosoire() {
    this.serviceDemande.getDemandesPcProvisoire().subscribe((data : any) =>{ 
      this.listDemandePcProvosoire = data
    ;
    for (let i = 0; i < this.listDemandePcProvosoire.length; i++) {
      const demande = this.listDemandePcProvosoire[i];
      const qrCodeText = `${demande.nom} ${demande.prenom} ${demande.fonction}`;
      this.serviceDemande.generateQrCode(qrCodeText).subscribe((qrCode: any) => {
        demande.qrCode = qrCode;
      });
    }
  });
  }
  signature(id:any){
    this.serviceDemande.updateDemandePcProvisoire(id).subscribe(
      (response: any) => {
        Swal.fire("", 'Modifié avec succés!', 'success');

      },
      (error : any)  => {
        Swal.fire('', 'Erreur', 'error')
      },
      () => {
        this.getDemandesPcProvosoire();
      }
    );
  }

}

