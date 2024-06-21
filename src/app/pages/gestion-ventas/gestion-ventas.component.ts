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

@Component({
  selector: 'app-gestion-ventas',
  templateUrl: './gestion-ventas.component.html',
  styleUrl: './gestion-ventas.component.scss'
})
export class GestionVentasComponent implements OnInit{
  listVentas : any[]=[];
  displayedColumns: string[] = ['position', 'fecha', 'subtotal', 'impuestos', 'total', 'cliente', 'vendedor', 'opciones'];
  dataSource!: MatTableDataSource<any>;
  formRegistro: any;
  idForm: string = 'idForm';
  age:any;
  //@ViewChild(MatPaginator) paginator: MatPaginator<any>;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
   // @ViewChild(DataTableDirective, { static: false })
  //dtElements: any = DataTableDirective;
  //isDtInitializeds: boolean = false;
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
    this.formRegistro = this.services.cargarFormVentas();
    this.getListVentas();
    this.getListClientes();
    this.getListVendedores();
  }

  ngAfterViewInit() {
    
  }

  registrar(){

    this.services.registrarVentas(this.formRegistro).subscribe(
      (result:any)=>{
        console.log('============>', result);
      },
      (error)=>{
        console.log('=======error=====>', error);
      }
    );

  }

  editar(uno:any,dos:any){}
  delete(no:any,dos:any){}

  getListVentas() {
    this.services.getVentas().subscribe(
      (result: any) => {
        //this.viewDateTableEspanol();
        this.listVentas = result;
        this.dataSource = new MatTableDataSource<any>(result);
        this.dataSource.paginator = this.paginator;
        //this.dataSource.filterPredicate = this.obtenerFuncionDeBusqueda();
      },
      (error) => {
        console.log(`Lsita eror:  ${error}`);
      }
    );
  }

  listClientes:any[]=[];
  getListClientes(){
    this.services.getClientes().subscribe(
      (result: any) => {
        //this.viewDateTableEspanol();
        this.listClientes = result;
      },
      (error) => {
        console.log(`Lsita eror:  ${error}`);
      }
    );
  }

  listVendedores:any[]=[];
  getListVendedores(){
    this.services.getVendedores().subscribe(
      (result: any) => {
        //this.viewDateTableEspanol();
        this.listVendedores = result;
      },
      (error) => {
        console.log(`Lsita eror:  ${error}`);
      }
    );
  }

  consultar(){
    alert('se esta consultado ...');
  }


  filtro: any = ''
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      //this.dataSource.filterPredicate = this.obtenerFuncionDeBusqueda();
    }
    this.filtro = filterValue
  }

  obtenerFuncionDeBusqueda() {
    let funcionFiltrado = (data: Dependencia, filtro: string): boolean => {
      if (filtro) {
        for (let i = 0; i < this.displayedColumns.length; i++) {
          if (this.displayedColumns[i] == "id") {
            continue;
          }
          const valor: string = data[this.displayedColumns[i] as keyof typeof data].toString().toLowerCase();
          if (valor.indexOf(filtro) != -1) {
            return true;
          }
        }
      }
      return false;
    };
    return funcionFiltrado;
  }

  regresar(){
    this.router.navigate(['/', 'gestion-principal'])
  }

   /**
   * Cierra modales
   * @param modal
   */
  cerrarModal(modal: any) {
    this.modal.dismissAll(modal);
  }

  editar2(form: any , modal: any){
    console.log(form);
    for (let obj in form) {

      for (let f in this.formRegistro.value) {
        console.log(obj);
        if (f == obj) {
          this.formRegistro.get(obj).setValue(form[obj]);
        }

      }
    }
    this.modal.open(modal, { size: 'xl', scrollable: true, backdrop: 'static', keyboard:false });
  }

  limpiar(){
    this.formRegistro.reset();
  }

  crear(tipo:string ){
    alert(tipo);
  }

  eliminar(id:any){  
    Swal.fire({
      title: `Documento #: ${id.id}`,
      text: '¿Eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => { 
          if (resultado.value) {
          this.spinner.show(); 
          this.services.deleteVenta(id.id).subscribe(
          (result: any) => {
            //this.viewDateTableEspanol();
            
            this.getListVendedores();
            
            this.toastr.success( 'Registro borrado correctamente' );
            this.router.navigate(['/','gestion-ventas']);
            
            this.spinner.hide();
            this.dataSource = new MatTableDataSource<any>(this.listVentas);
          },
          (error) => {
            this.spinner.hide();
          });
          
        } else {
          this.spinner.hide();
        }
        
    });

    this.router.navigate(['/','gestion-ventas']);
  }
}


export interface Dependencia {
  id: any;
  fecha: any;
  subtotal: any;
  impuestos: any;
  total: any;
  cliente: any;
  vendedor: any;
  tipo_vendedor: any;
  tipo_clientes:any;
}