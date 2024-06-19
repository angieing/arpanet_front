import { ChangeDetectorRef, Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
//import { DataTableDirective } from 'angular-datatables';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-gestion-principal',
  templateUrl: './gestion-principal.component.html',
  styleUrl: './gestion-principal.component.scss'
})
export class GestionPrincipalComponent implements OnInit{
  constructor(
    public services : ServiciosService,

    private route : ActivatedRoute,
    private spinner : NgxSpinnerService,
    //private serviceAuth : AutenticacionService,
    //private modal : NgbModal,
    private changeDetector: ChangeDetectorRef,
    /*config: NgbModalConfig*/

    public router : Router,
    public toastr : ToastrService
    )
    {
      //config.backdrop = 'static';
    }

  ngOnInit():void {

  }

  gestionarVentas(tipo:string){

    if(tipo == 'v'){
      this.router.navigate(['/', 'gestion-ventas']);
    }

    if(tipo == 'c'){
      this.router.navigate(['/', 'gestion-clientes']);
    }

    if(tipo == 've'){
      this.router.navigate(['/', 'gestion-vendedores']);
    }

    if(tipo == 'p'){
      this.router.navigate(['/', 'gestion-productos']);
    }

  }

}
