import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { Console } from 'console';
import { getAuth, updateEmail } from "firebase/auth";
import { reauthenticateWithCredential } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async register({ email, password }) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  async login({ email, password }) {
    try {

      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }



  updatemail( email ){

const autication=getAuth();

  updateEmail(autication.currentUser, email ).then(() => {
 
  }).catch((error) => {
    console.log(error)
   
  });
}
async sendResetPassword(){
  
const auth = getAuth();

sendPasswordResetEmail(auth, auth.currentUser.email)
  .then(() => {
  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   console.log(errorCode + "  "+errorMessage);
   return null;
  });
  return  auth.currentUser.email;
}
/* reauthentication(){
  const autication=getAuth(); 
  const user = autication.currentUser; 
  const credential = EmailAuthProvider.credential(user.email, userProvidedPassword);

  reauthenticateWithCredential(user, credential).then(() => {
 
  }).catch((error) => {
  
  });
} */



}
