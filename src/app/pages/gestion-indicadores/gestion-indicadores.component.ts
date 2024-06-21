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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Dependencia } from 'src/app/modelos/Entidades';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-gestion-indicadores',
  templateUrl: './gestion-indicadores.component.html',
  styleUrl: './gestion-indicadores.component.scss'
})
export class GestionIndicadoresComponent implements OnInit{

  customCollapsedHeight: string = '40px';
  customExpandedHeight: string = '40px';
  listVentas:any[] =[];

  constructor(
    public services : ServiciosService,

    private route : ActivatedRoute,
    private spinner : NgxSpinnerService,
    //private serviceAuth : AutenticacionService,
    private modal : NgbModal,
    private changeDetector: ChangeDetectorRef,
    /*config: NgbModalConfig*/

    public router : Router,
    public toastr : ToastrService
    )
    {
      //config.backdrop = 'static';
    }

  ngOnInit():void {    
   // this.listarAnio();
   //this.listarVendedorMasVende();
  }

  listarAnio(anio: Event){console.log("====>  ",(anio.target as HTMLInputElement).value);
    this.services.getBuscarPorAnio((anio.target as HTMLInputElement).value).subscribe(
      (result:any)=>{
        this.listVentas = result;
      },
      (error)=>{}
    );
  }

  listVendedorMasVende:any[] = [];
  listarVendedorMasVende(){
    this.services.getBuscarVendedorMasVende().subscribe(
      (result:any)=>{
        this.listVendedorMasVende = result;
      },
      (error)=>{}
    );
  }

  listPorAnioEspecifico:any[] = [];
  listarPorAnioEspecifico(anio: Event){
    this.services.getPorAnioEspecifico((anio.target as HTMLInputElement).value).subscribe(
      (result:any)=>{
        this.listPorAnioEspecifico = result;
      },
      (error)=>{}
    );
  }

  listPromedioVentas:any[] = [];
  listarPromedioVentas(){
    this.services.getPromedioVentas().subscribe(
      (result:any)=>{
        this.listPromedioVentas = result;
      },
      (error)=>{}
    );
  }

  listCantidadVentasAnioMesEspecifico:any[] = [];
  listarCantidadVentasAnioMesEspecifico(){
    this.services.getlistarCantidadVentasAnioMesEspecifico().subscribe(
      (result:any)=>{
        this.listCantidadVentasAnioMesEspecifico = result;
      },
      (error)=>{}
    );
  }

  regresar(){

  }
}
