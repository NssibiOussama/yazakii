import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Materiel } from 'src/app/models/materiel.model';
@Injectable({
  providedIn: 'root'
})
export class MaterielsService {

  token = this.authService.token;
  //id=this.authService.user.userId
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  MaterielUrl : string = 'http://localhost:3000/materiel'
  UserUrl : string = 'http://localhost:3000/user'


  constructor(private http : HttpClient, private authService : AuthService) { }

  getMateriel():Observable<Materiel[]>{
    return this.http.get<Materiel[]>(this.MaterielUrl,this.httpOptions)

  }

  getUsers():Observable<any[]>{
    return this.http.get<any[]>(this.UserUrl,this.httpOptions)

  }


  addMateriel(mat: Materiel): Observable<Materiel> {
    return this.http.post<Materiel>(this.MaterielUrl, mat,this.httpOptions);
  }
  deleteMateriel(id: any): Observable<any> {
    return this.http.delete<Materiel>(this.MaterielUrl + '/' + id,this.httpOptions);
  }

  getMaterielById(id: any): Observable<Materiel> {
    return this.http.get<Materiel>(this.MaterielUrl + '/' + id,this.httpOptions);
  }
  updateMateriel(id: number, tor: Materiel): Observable<Materiel> {
    return this.http.put<Materiel>(this.MaterielUrl + '/' + id, tor, this.httpOptions);
  }
  updateScrape(id:number){
    return this.http.put(this.MaterielUrl+'/scrape/'+id,this.httpOptions)
  }
  getScrapeMateriel():Observable<any[]>{
    return this.http.get<any[]>(this.MaterielUrl+ '/scrape',this.httpOptions)

  }
  updateScrape2(id:number){
    return this.http.put(this.MaterielUrl+'/scrape2/'+id,this.httpOptions)
  }
}

