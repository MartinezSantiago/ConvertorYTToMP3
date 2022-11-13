import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor( private authService: AuthService,
               private router: Router, private platform: Platform,
               private splashScreen: SplashScreen,
               private statusBar: StatusBar) {
              
                this.initializeApp();
               }

  redirectToConvertorTasaDeCambio(){
    this.router.navigateByUrl('/convertor-tasa-de-cambio', { replaceUrl: true });
  }

  redirectToPerfil(){
    this.router.navigateByUrl('/perfil', { replaceUrl: true });
  }

  redirectToConvertorMusica(){
    this.router.navigateByUrl('/convertidor-youtube', { replaceUrl: true });
  }

  async logout() {
    await this.authService.logout();
    
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log("100%");
    });
}}
