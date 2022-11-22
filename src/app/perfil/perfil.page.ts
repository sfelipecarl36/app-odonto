import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../user';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  users: any

  constructor(
    private alertController: AlertController,
    private router: Router,
    public firestore: AngularFirestore,
    private user: User,
    public auth: AngularFireAuth
  )
  {

    if(this.user.uid.length<1){
      this.router.navigateByUrl('login')
    }
    else{
      this.users = firestore.collection('users', ref => ref.
      where('uid', '==', user.uid)).valueChanges();
    }
    
   }

   async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Encessar Sessão?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Sair',
          handler: data => {
              this.logout()
            }
        },
      ],
    });

    await alert.present();
  }

  editar() {
    this.router.navigate(['editarperfil'])
  }

  logout(){
    this.auth.signOut()
    this.router.navigateByUrl('login')
  }

  }
