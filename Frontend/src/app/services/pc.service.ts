import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { pc } from 'src/app/models/pc.model';
@Injectable({
  providedIn: 'root'
})
export class PcService {

  token = this.authService.token;
  //id=this.authService.user.userId
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  demandePcUrl : string = 'http://localhost:3000/demandePc'


  constructor(private http : HttpClient, private authService : AuthService) { }

  getDemandes():Observable<pc[]>{
    return this.http.get<pc[]>(this.demandePcUrl,this.httpOptions)

  }

  addDemande(demande: pc): Observable<pc> {
    return this.http.post<pc>(this.demandePcUrl+'/'+this.authService.user.userId, demande,this.httpOptions);
  }
  deleteDemande(id: any): Observable<any> {
    return this.http.delete<pc>(this.demandePcUrl + '/' + id,this.httpOptions);
  }

  getDemandeById(id: any): Observable<pc> {
    return this.http.get<pc>(this.demandePcUrl + '/' + id,this.httpOptions);
  }
  updateDemande(id: number, demande: pc): Observable<pc> {
    return this.http.put<pc>(this.demandePcUrl + '/' + id, demande, this.httpOptions);
  }

}