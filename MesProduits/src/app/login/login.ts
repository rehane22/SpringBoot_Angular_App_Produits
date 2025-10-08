import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styles: ``
})
export class Login implements OnInit {

  user = new User();
  err: number = 0;
  constructor(private authService: AuthService, private router: Router) {
  }
  ngOnInit(): void {

  }

  /*  onLoggedin() {
     console.log(this.user);
     let isValidUser: Boolean = this.authService.SignIn(this.user);
     if (isValidUser)
       this.router.navigate(['/']);
 
     else {
       //alert('Login ou mot de passe incorrecte!');
       this.erreur = true;
       console.log('Login ou mot de passe incorrecte!');
     }
   } */

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;
      }
    });
  }
}
