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
    this.getListClientes();
    this.getListVendedores();
    this.formRegistro = this.services.cargarFormVentas();
    this.getListVentas();
    this.filterTable();   
    
  }

  ngAfterViewInit() {
    
  }

  registrar(){
   
      if (this.formRegistro.pristine) {       
        Swal.fire({ icon: 'info', title: 'No ha cambiado nada', text: '!' });
      } else {
        if(this.actualizarR){
          this.services.actualizaVentas(this.formRegistro).subscribe(
            (resultup:any)=>{              
              this.getListVentas(); 
              this.formRegistro.reset();
              Swal.fire({icon: 'info', title: 'Actualizado correctamente',  text: 'ok'});             
            },
            (errorup)=>{
              Swal.fire({ icon: 'warning', title: 'Error en la solicitud', text: '!' });
            }
          );
        }

        if(!this.actualizarR){
          this.services.registrarVentas(this.formRegistro).subscribe(
            (result:any)=>{             
              this.getListVentas(); 
              this.formRegistro.reset();
              Swal.fire({icon: 'info', title: 'Registrado correctamente',  text: 'ok'});                          
            },
            (error)=>{
              Swal.fire({ icon: 'warning', title: 'Error en la solicitud', text: '!' });
            }
          );
        }
    }

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
        Swal.fire({ icon: 'warning', title: 'Error en la solicitud', text: '!' });
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
        Swal.fire({ icon: 'warning', title: 'Error en la solicitud', text: '!' });
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
        Swal.fire({ icon: 'warning', title: 'Error en la solicitud', text: '!' });
      }
    );
  }

  consultar(){
  
  }


  filtro: any = ''
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();      
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
    for (let obj in form) {
      for (let f in this.formRegistro.value) {        
        if (f == obj) {
          this.formRegistro.get(obj).setValue(form[obj]);
          if (f == 'cliente') {
            this.formRegistro.get(obj).setValue((form[obj] = +form[obj]));
          }

          if (f == 'vendedor') {
            this.formRegistro.get(obj).setValue((form[obj] = +form[obj]));
          }
        }

      }
    }
    let enviarIdRegistro = this.formRegistro.value;
    enviarIdRegistro.id = form.id;

    let enviarIdVendedor = this.formRegistro.value;
    enviarIdVendedor.id = form.id;
    //this.modal.open(modal, { size: 'xl', scrollable: true, backdrop: 'static', keyboard:false });
  }

  limpiar(){
    this.formRegistro.reset();
  }

  crear(tipo:string ){
   
  }

  actualizarR: boolean = false;
  update(confirma: boolean) {
    this.actualizarR = !confirma ? false : true;
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
            this.getListVentas();
            Swal.fire({icon: 'info', title: 'Eliminado correctamente',  text: 'ok'});                                                              
            this.spinner.hide();
            //this.dataSource = new MatTableDataSource<any>(this.listVentas);
          },
          (error) => {
            this.spinner.hide();
          });
          
        } else {
          this.spinner.hide();
        }
        
    });
    
  }


  filterTable() {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.id.toLowerCase().includes(filter) || data.fecha.toLowerCase().includes(filter);
    };
  } 

     // validar campos numeros
     validateFormat(event:any) {   
        let key;
        key = event.keyCode;
        key = String.fromCharCode(key);
        const regex = /[0-9]|\./;
        if (! regex.test(key)) {
            event.returnValue = false;
            if (event.preventDefault) {
                event.preventDefault();
            }
        }
        
   
     }

     ///
     calcularTotalImpuesto(event: Event){   
      let valorSubtotal = this.formRegistro.value.subtotal;     
      let imp =this.formRegistro.value.impuestos;//(event.target as HTMLInputElement).value
      let resultado = parseInt(valorSubtotal) + (parseInt(imp));      
      this.formRegistro.get('total').setValue(resultado);
     }
}
