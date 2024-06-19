import { NgModule } from '@angular/core';
//import { RouterModule, Routes } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
const routes: Routes = [
  {
    path: 'dd',
    component: PagesComponent,
    //canActivate: [LoginGuard, VerifyTokenGuard],
    runGuardsAndResolvers: 'always',
    children: [

      {
        path: 'principal',
        component: PagesComponent,
        data: { showRootComponents: true },
      }
    ],
  },
];

export const appRoutingProviders:any[] =[];
@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload',useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
