import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*  users: User[] = [
     { "username": "admin", "password": "123", "roles": ['ADMIN'] },
     { "username": "nadhem", "password": "123", "roles": ['USER'] }
   ]; */

  private helper = new JwtHelperService();
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  token: string = "";

  constructor(private router: Router, private http: HttpClient) { }
  login(user: User) {
    console.log(user)
    return this.http.post<User>(environment.apiURLServices + '/login', user, { observe: 'response' });
  }
  decodeJWT() {
    if (this.token == undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }
  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }


  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

  getToken(): string {
    return this.token;
  }
  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
  isAdmin(): Boolean {
    if (!this.roles)
      return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }

  /*  getUserRoles(username: string) {
     this.users.forEach((curUser) => {
       if (curUser.username == username) {
         this.roles = curUser.roles;
       }
     });
   } */

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    //  this.getUserRoles(login);
  }

}

