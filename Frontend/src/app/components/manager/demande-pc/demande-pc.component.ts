import { Component, OnInit } from '@angular/core';
import { pc } from 'src/app/models/pc.model';
import { DemandeService } from '../../../services/demande.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-pc',
  templateUrl: './demande-pc.component.html',
  styleUrls: ['./demande-pc.component.css','../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css']
})
export class DemandePcComponent implements OnInit {
  listDemandePc: pc[] = []

  constructor(private serviceDemande: DemandeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getDemandesPc()
  }
  getDemandesPc() {
    this.serviceDemande.getDemandesPc().subscribe((data) =>{ this.listDemandePc = data
    ;
    })

  }
  signature(id:any){
    this.serviceDemande.updateDemandePc(id).subscribe(
      (response: any) => {
        Swal.fire("", 'Modifié avec succés!', 'success');

      },
      error => {
        Swal.fire('', 'Erreur', 'error')
      },
      () => {
        this.getDemandesPc();
      }
    );
  }

}

