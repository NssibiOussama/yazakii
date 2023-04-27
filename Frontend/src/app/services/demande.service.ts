import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Demande } from 'src/app/models/demande.model';
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
  
  demande(demande: Demande,id:number): Observable<Demande> {
    return this.http.post<Demande>(this.demandUrl+ '/' + id, demande,this.httpOptions);
  }
}
