import { Component, OnInit, ViewChild } from '@angular/core';
import { pc } from 'src/app/models/pc.model';
import { DemandeService } from '../../../services/demande.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';


@Component({
  selector: 'app-demande-pc',
  templateUrl: './demande-pc.component.html',
  styleUrls: ['./demande-pc.component.css','../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css']
})
export class DemandePcComponent implements OnInit {
  listDemandePc: pc[] = []
  qrCodeText: string = '';
  webcamError: WebcamInitError | null = null;
  showWebcam = true;
  @ViewChild('webcam') webcam: any;
  listQrCode : any [] = []


  constructor(private serviceDemande: DemandeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getDemandesPc()
  }
  getDemandesPc() {
    this.serviceDemande.getDemandesPc().subscribe((response: any) => {
      this.listDemandePc = response;
      for (let i = 0; i < this.listDemandePc.length; i++) {
        const demande = this.listDemandePc[i];
        const qrCodeText = `${demande.nom} ${demande.prenom} ${demande.fonction}`;
        this.serviceDemande.generateQrCode(qrCodeText).subscribe((qrCode: any) => {
          demande.qrCode = qrCode;
        });
      }
    });

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




  generateQRCode() {
    this.qrCodeText = 'https://example.com';
  }

  // Function for scanning a QR code
  scanQRCode() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        if (mediaDevices && mediaDevices.length) {
          const videoConstraints = {
            deviceId: mediaDevices[0].deviceId,
            facingMode: 'environment',
          };
          this.showWebcam = true;
          setTimeout(() => {
            this.webcam.triggerSnapshot();
          }, 1000);
        }
      })
      .catch((err) => console.error(err));
  }

  // Callback function for when a QR code is detected in the camera feed
  handleImage(webcamImage: WebcamImage): void {
  // Send the image to the backend for decoding
  const formData = new FormData();
  formData.append('imageUrl', webcamImage.imageAsDataUrl);
  fetch('http://localhost:3000/scanQR', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.qrCode) {
        alert(`QR code detected: ${data.qrCode}`);
      } else {
        alert('No QR code detected');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error while scanning QR code');
    });
  }

}

