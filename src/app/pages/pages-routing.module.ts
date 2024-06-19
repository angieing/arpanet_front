import { NgModule } from '@angular/core';
///import { RouterModule, Routes } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { GenerarTurnosComponent } from './generar-turnos/generar-turnos.component';
import { GestionLoginComponent } from './gestion-login/gestion-login.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    //canActivate: [LoginGuard, VerifyTokenGuard],
    runGuardsAndResolvers: 'always',
    children: [

      {
        path: 'login',
        component: GestionLoginComponent,
        data: { showRootComponents: true}
      },

      {
        path: 'generar-turnos',
        component: GenerarTurnosComponent,
        data: { showRootComponents: true}
      }
      //{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
