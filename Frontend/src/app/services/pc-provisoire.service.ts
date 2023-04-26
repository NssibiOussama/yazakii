import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { pcProvisoire } from 'src/app/models/pcProvisoire.model';
@Injectable({
  providedIn: 'root'
})
export class PcProvisoireService {

  token = this.authService.token;
  //id=this.authService.user.userId
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  demandePcUrl : string = 'http://localhost:3000/demandePcProvisoire'


  constructor(private http : HttpClient, private authService : AuthService) { }

  getDemandes():Observable<pcProvisoire[]>{
    return this.http.get<pcProvisoire[]>(this.demandePcUrl,this.httpOptions)

  }

  addDemande(demande: pcProvisoire): Observable<pcProvisoire> {
    return this.http.post<pcProvisoire>(this.demandePcUrl+'/'+this.authService.user.userId, demande,this.httpOptions);
  }
  deleteDemande(id: any): Observable<any> {
    return this.http.delete<pcProvisoire>(this.demandePcUrl + '/' + id,this.httpOptions);
  }

  getDemandeById(id: any): Observable<pcProvisoire> {
    return this.http.get<pcProvisoire>(this.demandePcUrl + '/' + id,this.httpOptions);
  }
  updateDemande(id: number, demande: pcProvisoire): Observable<pcProvisoire> {
    return this.http.put<pcProvisoire>(this.demandePcUrl + '/' + id, demande, this.httpOptions);
  }

}
