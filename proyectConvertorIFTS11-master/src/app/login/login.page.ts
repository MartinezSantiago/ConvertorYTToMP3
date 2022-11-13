import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { setInterval } from 'timers';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  crendenciales:FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {

(<HTMLInputElement>document.getElementById("menu")).hidden=true;
  }


  get email() {
    return this.crendenciales.get('email');
  }

  get password() {
    return this.crendenciales.get('password');
  }

  ngOnInit() {
    this.crendenciales = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
   

  }

  async login() {

    

    const user = await this.authService.login(this.crendenciales.value);


    if (user) {
      this.router.navigateByUrl('/convertidor-youtube', { replaceUrl: true });
    } else {
      this.showAlert('Usuario o contraseña incorrecta', 'Intente devuelta!');
    }
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  redirectToRegister(){
    this.router.navigateByUrl('/register', { replaceUrl: true });
  
  }

}
