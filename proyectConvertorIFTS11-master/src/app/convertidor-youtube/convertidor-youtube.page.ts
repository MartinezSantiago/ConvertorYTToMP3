import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ImagenService } from '../services/imagen.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Console } from 'console';

@Component({
  selector: 'app-convertidor-youtube',
  templateUrl: './convertidor-youtube.page.html',
  styleUrls: ['./convertidor-youtube.page.scss'],
})
export class ConvertidorYoutubePage implements OnInit {

  profile = null;

  constructor(
    private imagenService: ImagenService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.imagenService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });document.getElementById("menu").hidden=false; 
  }

  ngOnInit(): void {


  }

  /*INICIO - Se utiliza la API de google donde se encuentra la página con el video que desea el usuario*/
 

  async EvenListener() {
    /* INICIO- Se muetra el video del link suministrado por el usuario y el audio*/
    var youtubelink = (<HTMLInputElement>document.getElementById('youtubelink')).value;
    let link = await (document.getElementById("youtubelink") as HTMLInputElement).value;
    let linkIframe;
    if (link.includes("watch")) {
      linkIframe = "https://www.youtube.com/embed/" + link.split('=')[1].split('&')[0];
    } else {
      linkIframe = "https://www.youtube.com/embed/" + link.split('youtu.be/')[1].split('&')[0];
    }


    let iframe = document.getElementById('iframe-youtube');
    iframe.hidden = false;
    iframe.setAttribute("src", linkIframe);

   
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '912e112241msha327f0fc95015eap151405jsn55ceca61bc3d',
        'X-RapidAPI-Host': 't-one-youtube-converter.p.rapidapi.com'
      }
    };
    let linkAudio;
   await fetch('https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess?url='+link+'&format=mp3&responseFormat=json&lang=en', options)
      .then(response => response.json())
      .then(result => {
      linkAudio=  result.YoutubeAPI["urlMp3"];
     
    });
    


    
    
      let anchor=document.createElement("a");
      anchor.setAttribute("href", linkAudio)
      
      anchor.type = "audio/mp3";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor); 
      document.getElementById('audio').style.display = 'block';
 (<HTMLAudioElement>document.getElementById("audio")).setAttribute("src",linkAudio);
    this.presentAlert();

    /* FIN- Se muetra el video del link suministrado por el usuario y el audio*/
  };
  /* FIN - Alerta, sí se ejecuto todo correctamente*/
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Se convirtió de manera exitosa',
      message: 'El video se convirtió de manera exitosa.',
      buttons: ['OK'], cssClass: 'alertDownload',
    }); await alert.present();

  }
  /* FIN - Alerta, sí se ejecuto todo correctamente*/
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
  /* INICIO - Se pasa a base 64 la imagen sumnistrada por el usuario*/
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
  redirectToConvertorTasaDeCambio(){
    this.router.navigateByUrl('/convertor-tasa-de-cambio', { replaceUrl: true });
  }


  
 
}