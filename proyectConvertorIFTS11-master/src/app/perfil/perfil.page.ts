import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ImagenService } from '../services/imagen.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {  AuthService } from '../services/auth.service';
import { documentId } from '@firebase/firestore';
import { UploadDataService } from '../services/upload-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  profile = null;


  constructor(private imagenService: ImagenService,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private auth: AuthService,private upload:UploadDataService,private router:Router
              ) {  this.imagenService.getUserProfile().subscribe((data) => {
      this.profile = data;


    });
  this.imagenService.setImageUrlBefore();
 
    document.getElementById("menu").hidden=false;

  
  }

  ngOnInit() {
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

      if (result==null) {
        const alert = await this.alertController.create({
          header: 'Falló la subida de la imagen',
          message: 'Hubo un problema con la imagen suministrada.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    else{
      (<HTMLInputElement>document.getElementById("ImageUrl")).setAttribute("src",result);
    }
    }
}



guardarCambios(){
let Nombre =  (<HTMLInputElement>document.getElementById("Nombre")).value;
this.upload.updateNombre(Nombre);
this.imagenService.updateImage((<HTMLInputElement>document.getElementById("ImageUrl")).getAttribute("src"));
console.log((<HTMLInputElement>document.getElementById("ImageUrl")).getAttribute("src"))
}
async cambiarContrasenia(){
 let result= await this.auth.sendResetPassword();

 if(result!=null){
  const alert = await this.alertController.create({
    header: 'Mail Enviado',
    message: 'Se ha enviado un mail \n('+result+') para el cambio de contraseña',
    buttons: ['OK'],
  })
  await alert.present();


 }

}

}
