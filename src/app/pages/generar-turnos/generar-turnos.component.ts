import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
///import { SpinerComponent } from '../components/spiner/spiner.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-generar-turnos',
  templateUrl: './generar-turnos.component.html',
  styleUrls: ['./generar-turnos.component.scss']
})
export class GenerarTurnosComponent {

  public formTurnos: any;
  public selected:any;
  public selectedS:any;
  comercios: any[] = [];
  servicios: any[] = [];
  registrosArray: any[] = [];
  usuario:any;

  //parametros tabla
  dtOptionss: DataTables.Settings = {};
  dtTriggers = new Subject();

  @ViewChild(DataTableDirective, { static: false })
  dtElements: any = DataTableDirective;
  isDtInitializeds: boolean = false;


  constructor(
    public serviciosGenerales : ServiciosService,
    /*
    private route : ActivatedRoute,
    private spinner : NgxSpinnerService,
    public router : Router,
    public toastr : ToastrService,
    private serviceAuth : AutenticacionService,
    private modal : NgbModal,
    private changeDetector: ChangeDetectorRef,
    config: NgbModalConfig*/

    public router : Router,
    public toastr : ToastrService,
    //private spinner : NgxSpinnerService,
    )
    {
      //config.backdrop = 'static';
    }

    //public spin: SpinerComponent = new SpinerComponent(this.spinner);
  ngOnInit():void {
    this.usuario = localStorage.getItem('user')?.toString();
    this.formTurnos = this.serviciosGenerales.cargarFormTurnos();
    this.cargarComercios(1);
  }


  cargarComercios(id:any){
    /**
   * Obtener listado de comercios
    */
         this.comercios = [];
         this.serviciosGenerales.getComercios().subscribe(
          (result) => {
             this.comercios = result;
         });

  }

  enviarDatos(){
    console.log('');
  }





}
