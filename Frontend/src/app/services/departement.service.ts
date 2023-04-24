import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Departement } from 'src/app/models/departement.model';
@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  token = this.authService.token;
  //id=this.authService.user.userId
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  DepartementUrl : string = 'http://localhost:3000/departement'


  constructor(private http : HttpClient, private authService : AuthService) { }

  getDepartement():Observable<Departement[]>{
    return this.http.get<Departement[]>(this.DepartementUrl,this.httpOptions)

  }

  addDepartement(dept: Departement): Observable<Departement> {
    return this.http.post<Departement>(this.DepartementUrl, dept,this.httpOptions);
  }
  deleteDepartement(id: any): Observable<any> {
    return this.http.delete<Departement>(this.DepartementUrl + '/' + id,this.httpOptions);
  }

  getDepartementById(id: any): Observable<Departement> {
    return this.http.get<Departement>(this.DepartementUrl + '/' + id,this.httpOptions);
  }
  updateDepartement(id: number, dept: Departement): Observable<Departement> {
    return this.http.put<Departement>(this.DepartementUrl + '/' + id, dept, this.httpOptions);
  }

}