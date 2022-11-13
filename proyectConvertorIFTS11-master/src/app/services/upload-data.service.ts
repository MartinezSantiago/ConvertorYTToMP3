import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc,updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UploadDataService {

  

  constructor( private auth: Auth,
    private firestore: Firestore) { }
    async createFields(Nombre){

    const user = this.auth.currentUser;
    const ImageUrl="";
    const ImageUrlBefore="";
     const userDocRef = doc(this.firestore, `users/${user.uid}`);
     await setDoc(userDocRef, {
      Nombre,ImageUrl, ImageUrlBefore
    });
    }
    async updateNombre(Nombre){
      const user = this.auth.currentUser;
   
       const userDocRef = doc(this.firestore, `users/${user.uid}`);
       await updateDoc(userDocRef, {
        Nombre:Nombre
      });
    }
    
}
