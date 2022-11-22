import { NgModule } from '@angular/core';
import { Routes, RouterModule, ChildrenOutletContexts } from '@angular/router';
import 'firebase/firestore'; //Older Version
import 'firebase/compat/firestore'; //v9
import 'firebase/auth';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),
      },

      {
        path: 'historico',
        loadChildren: () => import('../historico/historico.module').then( m => m.HistoricoPageModule),
      },

      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule),
      },
      {
        path: 'editarperfil',
        loadChildren: () => import('../editarperfil/editarperfil.module').then( m => m.EditarperfilPageModule)
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}