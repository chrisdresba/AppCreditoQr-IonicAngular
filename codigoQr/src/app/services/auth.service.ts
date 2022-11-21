import { Injectable, NgZone } from '@angular/core';
//import { auth } from 'firebase/app/';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
//import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { filter, first, map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public ngFireAuth: AngularFireAuth,
    public router: Router,
  ) {
  
  }

  // Login in with email/password
  SignIn(email:any, password:any) {
    try{
    const user =  this.ngFireAuth.signInWithEmailAndPassword(email, password);
    return user;
  }
  catch (e) {
    return null;
  }
  }

  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.clear();
      localStorage.removeItem("user");
      this.router.navigate(["login"]);
    });
  }


}
