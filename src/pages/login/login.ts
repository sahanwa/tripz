import { window } from 'rxjs/operator/window';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
//import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2'
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  user = {} as User;

  constructor(public facebook: Facebook, public alertCtrl: AlertController, private afauth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User){
    try{
   const result = await this.afauth.auth.signInWithEmailAndPassword(user.email, user.password);
   console.log(result);
   if(result){
     this.navCtrl.setRoot(HomePage);
     console.log(result);
     }
   }
  catch(e){
    console.error(e);
    
    let alert = this.alertCtrl.create({
      title: 'Invalid Login!',
      subTitle: 'The username or password is incorrect. Try again!',
      buttons: ['OK']
    });
    alert.present();
 
   }
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  fbLogin(){
    /*try{
    this.afauth.auth.signInWithPopup({
      provider: firebase.auth.AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then((response) => {
      console.log('Login success with Facebook!' + JSON.stringify(response));
      let currentuser = {
        email: response.auth.displayName,
        pciture: response.auth.photoURL
      };
      window.localstorage.setItem('currentuser',JSON.stringify(currentuser));
      this.navCtrl.push(HomePage);
    })
    }
  catch(e) {
      console.error(e);
    }*/
    this.facebook.login(['email']).then(res=>{
      const fc=firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      firebase.auth().signInWithCredential(fc).then(fs => {
        alert("firebase sec")
      }).catch(ferr=>{
        alert("firebase error!")
      })
    }).catch((err)=> {
      alert(JSON.stringify(err))
    })
  }


}