import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ligneInternet } from 'src/app/models/demandeLigneInternet.model';
@Injectable({
  providedIn: 'root'
})
export class LigneInternetService {

  token = this.authService.token;
  //id=this.authService.user.userId
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  demandeLigneInternetUrl : string = 'http://localhost:3000/demandeLigneInternet'


  constructor(private http : HttpClient, private authService : AuthService) { }

  getDemandes():Observable<ligneInternet[]>{
    return this.http.get<ligneInternet[]>(this.demandeLigneInternetUrl,this.httpOptions)

  }

  addDemande(demande: ligneInternet): Observable<ligneInternet> {
    return this.http.post<ligneInternet>(this.demandeLigneInternetUrl+'/'+this.authService.user.userId, demande,this.httpOptions);
  }
  deleteDemande(id: any): Observable<any> {
    return this.http.delete<ligneInternet>(this.demandeLigneInternetUrl + '/' + id,this.httpOptions);
  }

  getDemandeById(id: any): Observable<ligneInternet> {
    return this.http.get<ligneInternet>(this.demandeLigneInternetUrl + '/' + id,this.httpOptions);
  }
  updateDemande(id: number, demande: ligneInternet): Observable<ligneInternet> {
    return this.http.put<ligneInternet>(this.demandeLigneInternetUrl + '/' + id, demande, this.httpOptions);
  }

}