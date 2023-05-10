import { Component, OnInit } from '@angular/core';
import { ligneInternet } from 'src/app/models/demandeLigneInternet.model';
import { DemandeService } from '../../../services/demande.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-demande-ligne-internet',
  templateUrl: './demande-ligne-internet.component.html',
  styleUrls: ['./demande-ligne-internet.component.css','../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css']
})
export class DemandeLigneInternetComponent implements OnInit {
  listDemandeLigneInternet: ligneInternet[] = []

  constructor(private serviceDemande: DemandeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getDemandesLigneInternet()
  }
  getDemandesLigneInternet() {
    this.serviceDemande.getDemandesLigneInternet().subscribe((data) =>{ this.listDemandeLigneInternet = data
    ;
    for (let i = 0; i < this.listDemandeLigneInternet.length; i++) {
      const demande = this.listDemandeLigneInternet[i];
      const qrCodeText = `${demande.nom} ${demande.prenom} ${demande.fonction}`;
      this.serviceDemande.generateQrCode(qrCodeText).subscribe((qrCode: any) => {
        demande.qrCode = qrCode;
      });
    }
  });

  }
  signature(id:any){
    this.serviceDemande.updateDemandeLigneInternet(id).subscribe(
      (response: any) => {
        Swal.fire("", 'Modifié avec succés!', 'success');

      },
      error => {
        Swal.fire('', 'Erreur', 'error')
      },
      () => {
        this.getDemandesLigneInternet();
      }
    );
  }

}
