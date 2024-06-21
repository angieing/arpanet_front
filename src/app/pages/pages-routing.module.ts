import { GestionPrincipalComponent } from './gestion-principal/gestion-principal.component';
import { NgModule } from '@angular/core';
///import { RouterModule, Routes } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { GestionLoginComponent } from './gestion-login/gestion-login.component';
import { PagesComponent } from './pages.component';
import { GestionVentasComponent } from './gestion-ventas/gestion-ventas.component';
import { GestionVendedoresComponent } from './gestion-vendedores/gestion-vendedores.component';
import { GestionClientesComponent } from './gestion-clientes/gestion-clientes.component';
import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';
import { GestionIndicadoresComponent } from './gestion-indicadores/gestion-indicadores.component';

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
        path: 'gestion-principal',
        component: GestionPrincipalComponent,
        data: { showRootComponents: true}
      },

      {
        path: 'gestion-ventas',
        component: GestionVentasComponent,
        data: { showRootComponents: true}
      },

      {
        path: 'gestion-vendedores',
        component: GestionVendedoresComponent,
        data: { showRootComponents: true}
      },

      {
        path: 'gestion-clientes',
        component: GestionClientesComponent,
        data: { showRootComponents: true}
      },

      {
        path: 'gestion-productos',
        component: GestionProductosComponent,
        data: { showRootComponents: true}
      },

      {
        path: 'gestion-indicadores',
        component: GestionIndicadoresComponent,
        data: { showRootComponents: true}
      },



      //{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
