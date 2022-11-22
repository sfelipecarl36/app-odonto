import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../user';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  email: any
  senha: any
  userUid: string;
  uid: string = '';
  users: any;
  nome: any;
  celular: any;

    constructor(
      public auth: AngularFireAuth,
      public firestore: AngularFirestore,
      private user: User,
      private router: Router,
      private toastController: ToastController
    ) { 
      this.users = this.firestore.collection('users');
    }
  
    ngOnInit() {
    }

    async presentToast(position: 'top' | 'middle' | 'bottom') {
      const toast = await this.toastController.create({
        message: 'Cadastro concluído!',
        duration: 1500,
        position: position
      });
  
      await toast.present();
    }
  
    async cadastrar() {
      return await this.auth.createUserWithEmailAndPassword(this.email, this.senha).then( usuario => {
        this.user.uid = usuario.user.uid;
        this.users.doc(usuario.user.uid).set({ email: this.email, displayName: this.nome, celular: this.celular, photoURL: 'https://firebasestorage.googleapis.com/v0/b/app-odonto-belem.appspot.com/o/perfil.png?alt=media&token=2de20cc1-6c29-4cbf-95b0-8632f26c6272', uid: usuario.user.uid});
        this.router.navigateByUrl('login');
        this.presentToast('middle')
      })
  }
  
  }
