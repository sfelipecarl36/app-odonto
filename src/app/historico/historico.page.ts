import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../user';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage {
  
  profissionais: any;
  agendamentos: any;
  agend: any;
  nomeprof: any
  servicos: any;
  useruid: any;
  status: any;
  users: any;
  

  constructor(
    private router: Router,
    public firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private user: User,
    public auth: AngularFireAuth
  ) { 

    
    if(this.user.uid.length<1){
      this.router.navigateByUrl('login')
    }
    else{
      this.users = firestore.collection('users', ref => ref.
      where('uid', '==', user.uid)).valueChanges();
      
      this.agend = this.firestore.collection('agendamentos', ref => ref.limit(15)
      // .orderBy('id', 'desc')
      .where('user', '==', user.uid));
      this.agendamentos = this.agend.valueChanges()
      this.status = this.firestore.collection('status', ref => ref.orderBy('id', 'asc')).valueChanges();
      this.servicos =  this.firestore.collection('servicos', ref => ref.limit(100).orderBy('id', 'desc')).valueChanges();
    }

    
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      duration: 1400,
      spinner: 'circles',
    });

    loading.present();
  }

  detalhar(servico, profissional, data, hora, pagamento, docId, status) {
    this.router.navigate(['detailservico'],{
    queryParams: [servico, profissional, data, hora, pagamento, docId, status]
    })
  }

  ionViewDidLoad(){
    this.showLoading()
  }

  segmentChanged(e){
    if(this.user.uid.length<1){
      this.router.navigateByUrl('login')
    }
    else{
    this.agend = this.firestore.collection('agendamentos', ref => ref.limit(15).
    orderBy('id', 'desc').where('status', '==',String(e.detail.value)).where('user', '==',this.user.uid));

    this.agendamentos = this.agend.valueChanges()
    }
    
  }

}
