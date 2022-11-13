import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, getFirestore, setDoc,updateDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class ImagenService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}
/* INICIO - Trae la información del usuario logeado*/
  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef);
  }
/* FIN - Trae la información del usuario logeado*/

  async uploadImage(cameraFile: Photo) {
    // Se obtiene el usuario
    const user = this.auth.currentUser;
    // Se crea el path
    const path = `uploads/${user.uid}/profile.png`;
    // Se crea la referencia al Firebase Storage, donde se guardará la imagen
    const storageRef = ref(this.storage, path);
   
    try {
      // Se sube la imagen en base 64 al Storage
      await uploadString(storageRef, cameraFile.base64String, 'base64');
      // Se descarga la URL donde se almacenó la imagen 
      const imageUrl = await getDownloadURL(storageRef);
     
     /* INICIO - Se almacena la URL de la imagen en Firestore*/
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
     

      await updateDoc(userDocRef, {
        ImageUrlBefore:imageUrl,
      });
  /* FIN - Se almacena la URL de la imagen en Firestore*/
      return imageUrl;
    } catch (e) {
      return null;
    }
  }
  async updateImage(imageUrl) {
    const user = this.auth.currentUser;
      
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
     

      await updateDoc(userDocRef, {
        ImageUrl:imageUrl,
      });
  }
  async setImageUrlBefore(){
    const user = this.auth.currentUser;
      
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
   

    await updateDoc(userDocRef, {
      ImageUrlBefore:"",
    });
  }
}
