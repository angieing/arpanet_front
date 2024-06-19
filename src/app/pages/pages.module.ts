import { GestionPrincipalComponent } from './gestion-principal/gestion-principal.component';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
//import { NgSelectModule } from '@ng-select/ng-select';
//import { DataTablesModule } from 'angular-datatables';
//import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';


import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SpinerComponent } from './components/spiner/spiner.component';
import { TemplateComponent } from './components/template/template.component';
import { GestionLoginComponent } from './gestion-login/gestion-login.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MatPaginator } from '@angular/material/paginator';
import { GestionClientesComponent } from './gestion-clientes/gestion-clientes.component';
import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';
import { GestionVendedoresComponent } from './gestion-vendedores/gestion-vendedores.component';
import { GestionVentasComponent } from './gestion-ventas/gestion-ventas.component';
@NgModule({ declarations: [
        TemplateComponent,
        PagesComponent,
        GestionLoginComponent,
        GestionPrincipalComponent,
        GestionClientesComponent,
        GestionProductosComponent,
        GestionVendedoresComponent,
        GestionVentasComponent,
        SpinerComponent
    ],
    exports: [TemplateComponent], imports: [CommonModule,
        //ComponentsModule,
        PagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        //NgSelectModule,
        MatFormFieldModule,
        MatGridListModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDividerModule,
        //DataTablesModule,
        ToastrModule.forRoot(),
        MatIconModule,
        MatTooltipModule,
        MatBottomSheetModule,
        MatDialogModule,
        MatRadioModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        NgxSpinnerModule,
        //NgxMaskModule.forRoot(),
        MatProgressBarModule,
        MatExpansionModule,
        MatTabsModule,
        MatSlideToggleModule,
        MatListModule,
        MatDatepickerModule,
        MatTableModule,
        MatPaginator,
        MatToolbarModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class PagesModule {}
