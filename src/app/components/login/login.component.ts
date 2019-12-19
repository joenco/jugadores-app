import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensajeError: string;
  constructor(public loginService: LoginService) {
    this.mensajeError = '';
  }

  ngOnInit() {
  }

  onLogin(username: string, password: string): boolean {
    this.mensajeError = '';
    if (!this.loginService.login(username, password)) {
      this.mensajeError = 'Login incorrecto.';
      setTimeout(function() {
        this.mensajeError = '';
      }.bind(this), 2500);
    }
    return false;
  }

  onLogout(): boolean {
    this.loginService.logout();
    return false;
  }

}
