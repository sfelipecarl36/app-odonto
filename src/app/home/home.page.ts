import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { User } from '../user';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  users: any;
  usersSel: any;

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    public user: User,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    if(this.user.uid==''){
      this.router.navigateByUrl('login')
    }
    else{
      this.users = this.firestore.collection('users', ref => ref.where('uid', '==', this.user.uid)).valueChanges();
      this.usersSel = this.firestore.collection('users', ref => ref.where('uid', '==', this.user.uid));

      this.users.subscribe((res: User[]) => {

        res.forEach((dado) => {
          console.log(dado.uid)
        });
    })
    }

  }

}
