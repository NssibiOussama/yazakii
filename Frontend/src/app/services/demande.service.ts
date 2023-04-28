import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ligneInternet } from 'src/app/models/demandeLigneInternet.model';
import { pc } from 'src/app/models/pc.model';
import { pcProvisoire } from 'src/app/models/pcProvisoire.model';
@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  token = this.authService.token;
  //id=this.authService.user.userId
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  demandUrl : string = 'http://localhost:3000/demande'


  constructor(private http : HttpClient, private authService : AuthService) { }
  

  getDemandesLigneInternet():Observable<ligneInternet[]>{
    return this.http.get<ligneInternet[]>(this.demandUrl +'/ligneInternet/'+this.authService.user.role+'/'+this.authService.user.departement,this.httpOptions)

  }
  getDemandesPc():Observable<pc[]>{
    return this.http.get<pc[]>(this.demandUrl +'/pc/'+this.authService.user.role+'/'+this.authService.user.departement,this.httpOptions)

  }
  
  getDemandesPcProvisoire():Observable<pcProvisoire[]>{
    return this.http.get<pcProvisoire[]>(this.demandUrl +'/pcprovisoire/'+this.authService.user.role+'/'+this.authService.user.departement,this.httpOptions)

  }
  updateDemandeLigneInternet(id: number): Observable<ligneInternet> {
    return this.http.put<ligneInternet>(this.demandUrl + '/ligneInternet/'+this.authService.user.role+'/'+ id, this.httpOptions);
  }
  updateDemandePc(id: number): Observable<pc> {
    return this.http.put<pc>(this.demandUrl + '/pc/'+this.authService.user.role+'/'+ id, this.httpOptions);
  }
  updateDemandePcProvisoire(id: number): Observable<pcProvisoire> {
    return this.http.put<pcProvisoire>(this.demandUrl + '/pcprovisoire/'+this.authService.user.role+'/'+ id, this.httpOptions);
  }
}
