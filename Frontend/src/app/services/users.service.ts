import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Materiel } from 'src/app/models/materiel.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

 
  token = this.authService.token;
  //id=this.authService.user.userId
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  UserUrl : string = 'http://localhost:3000/user'


  constructor(private http : HttpClient, private authService : AuthService) { }


  getUsers():Observable<any[]>{
    return this.http.get<any[]>(this.UserUrl,this.httpOptions)

  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete<Materiel>(this.UserUrl + '/' + id,this.httpOptions);
  }

  updateUser(id: number, firstname:string, lastname:string,email: string, role: string): Observable<any> {
    return this.http.put<Materiel>(this.UserUrl + '/' + id, {firstname,lastname,email,role}, this.httpOptions);
  }
  getUserById(id: any): Observable<any> {
    return this.http.get<Materiel>(this.UserUrl + '/' + id,this.httpOptions);
  }
}
