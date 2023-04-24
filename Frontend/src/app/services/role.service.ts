import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role.model';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  token = this.authService.token;
  //id=this.authService.user.userId
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  roleUrl : string = 'http://localhost:3000/role'


  constructor(private http : HttpClient, private authService : AuthService) { }

  getRoles():Observable<Role[]>{
    return this.http.get<Role[]>(this.roleUrl,this.httpOptions)

  }

  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.roleUrl, role,this.httpOptions);
  }
  deleteRole(id: any): Observable<any> {
    return this.http.delete<Role>(this.roleUrl + '/' + id,this.httpOptions);
  }

  getRoleById(id: any): Observable<Role> {
    return this.http.get<Role>(this.roleUrl + '/' + id,this.httpOptions);
  }
  updateRole(id: number, role: Role): Observable<Role> {
    return this.http.put<Role>(this.roleUrl + '/' + id, role, this.httpOptions);
  }

}
