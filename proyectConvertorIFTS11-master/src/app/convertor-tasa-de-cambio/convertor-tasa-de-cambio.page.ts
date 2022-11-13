import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ImagenService } from '../services/imagen.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-convertor-tasa-de-cambio',
  templateUrl: './convertor-tasa-de-cambio.page.html',
  styleUrls: ['./convertor-tasa-de-cambio.page.scss'],
})
export class ConvertorTasaDeCambioPage implements OnInit {
  APIKEY = '9c08deac06068b9a90d39d3d';
  profile = null;


  constructor( private imagenService: ImagenService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController) {  this.imagenService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });  document.getElementById("menu").hidden=false; }

  ngOnInit() {
  };


  async convertirArgToUsd() {
    let monedaInicial = (<HTMLInputElement>document.getElementById("monedaInicial")).value;
    let monedaFinal = (<HTMLInputElement>document.getElementById("monedaFinal")).value;
    let monto = (<HTMLInputElement>document.getElementById("monto")).value;

    if (monedaFinal == "USDBlue" && monedaInicial == "ARS") {
      fetch("https://api.bluelytics.com.ar/v2/latest").then(response => response.json()).then(result => {
        console.log(result.blue.value_sell);

        let resultado = (<HTMLInputElement>document.getElementById("resultado")).value;
        let resultado1 = (parseInt(monto)/result.blue.value_sell);

        (<HTMLInputElement>document.getElementById("resultado")).innerText = '$'+resultado1.toString();

      })
    }
    else {

      await fetch("https://v6.exchangerate-api.com/v6/"+this.APIKEY+"/latest/"+monedaInicial).then(response => response.json()).then(result => {
      console.log(result.conversion_rates[monedaFinal]); 
      let resultado= (<HTMLInputElement>document.getElementById("resultado")).value;
      let resultado1=(result.conversion_rates[monedaFinal]*parseInt(monto));
  
      (<HTMLInputElement>document.getElementById("resultado")).innerText= "$" + resultado1.toString();
  
      })


    }


  }
  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    /* FIN - Se pasa a base 64 la imagen sumnistrada por el usuario*/
    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();
      /* INICIO - Se pasa la imagen en base 64 al servicio ImagenService para que se suba la imagen al storage*/
      const result = await this.imagenService.uploadImage(image);
      /* FIN - Se pasa la imagen en base 64 al servicio ImagenService para que se suba la imagen al storage*/
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Falló la subida de la imagen',
          message: 'Hubo un problema con la imagen suministrada.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
}
redirectToConvertorMusica(){
  this.router.navigateByUrl('/convertidor-youtube', { replaceUrl: true });
}
async logout() {
  await this.authService.logout();
  this.router.navigateByUrl('/', { replaceUrl: true });
}
}
  



