import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login'

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(private afauth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }


  async register(){
    try{
   const result = await this.afauth.auth.createUserWithEmailAndPassword(this.user.email,this.user.password);
   console.log(result);
   this.navCtrl.push(LoginPage);
    }
    catch(e){
      console.error(e);
    }

  }

}
