import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrl: './gestion-productos.component.scss'
})
export class GestionProductosComponent implements OnInit {
  listProductos: any[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'porcentaje_impuesto', 'opciones'];
  dataSource!: MatTableDataSource<any>;
  formRegistro: any;
  idForm: string = 'idForm';
  age: any;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(
    public services: ServiciosService,

    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    //private serviceAuth : AutenticacionService,
    private modal: NgbModal,
    private changeDetector: ChangeDetectorRef,
    /*config: NgbModalConfig*/

    public router: Router,
    public toastr: ToastrService
  ) {
    //config.backdrop = 'static';
  }
  ngOnInit(): void {
    this.formRegistro = this.services.cargarFormProductos();
    this.getListProductos();
  }

  /**
 * Método de formulario de registro
 *
 */
  registrar() {
    if (this.formRegistro.pristine) {    
      Swal.fire({ icon: 'info', title: 'No ha hecho ajustes', text: '!' });
    } else {
      if (this.actualizarR) {
        this.services.actualizaProducto(this.formRegistro).subscribe(
          (result: any) => {
            this.getListProductos();
            Swal.fire({icon: 'info', title: 'Actualizado correctamente',  text: 'ok'});  
          },
          (error) => {
            Swal.fire({icon: 'warning', title: 'Error',  text: '!'});  
          }
        );
      }

      if (!this.actualizarR) {
        this.services.registrarProductos(this.formRegistro).subscribe(
          (result: any) => {
            this.getListProductos();
            Swal.fire({icon: 'info', title: 'Registrado correctamente',  text: 'ok'}); 
          },
          (error) => {
            Swal.fire({icon: 'warning', title: 'Error',  text: '!'});  
          }
        );
      }
    }
  }

  /**
   * Método de listar productos
   *
   */

  getListProductos() {
    this.services.getProductos().subscribe(
      (result: any) => {
        //this.viewDateTableEspanol();
        this.listProductos = result;
        this.dataSource = new MatTableDataSource<any>(result);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        Swal.fire({ icon: 'warning', title: 'Error en la solicitud', text: '!' });
      }
    );

  }

  /**
   *
   * Método para filtrar
   * Requerimiento funcional  Gestión Productos
   *
   */

  filtro: any = ''
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
    this.filtro = filterValue
  }

  /**Método para botón de regresar */

  regresar() {

    this.router.navigate(['/', 'gestion-principal'])
  }


  /**
   * Cierra modales
   * @param modal
   */
  cerrarModal(modal: any) {
    this.modal.dismissAll(modal);
  }

  /**Método para botón editar */

  editar2(form: any, modal: any) {    
    for (let obj in form) {
      for (let f in this.formRegistro.value) {       
        if (f == obj) {
          this.formRegistro.get(obj).setValue(form[obj]);
        }
      }
    }
    //this.modal.open(modal, { size: 'xl', scrollable: true, backdrop: 'static', keyboard: false });
  }



  limpiar() {
    this.formRegistro.reset();
  }

  crear(tipo: string) {

  }

  actualizarR: boolean = false;
  update(confirma: boolean) {
    this.actualizarR = !confirma ? false : true;
  }

  eliminar(id: any) {
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
        this.services.deleteProducto(id.id).subscribe(
          (result: any) => {
            //this.viewDateTableEspanol();
            this.getListProductos(); 
            Swal.fire({icon: 'info', title: 'Registro borrado correctament',  text: 'ok'});             
            this.spinner.hide();           
          },
          (error) => {
            Swal.fire({icon: 'warning', title: 'Error',  text: '!'});  
            this.spinner.hide();
          });

      } else {
        this.spinner.hide();
      }

    });   
  }

  filterTable() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.id.toLowerCase().includes(filter) || data.fecha.toLowerCase().includes(filter);
    };
  }

  validateFormat(event: any) {
    let key;
    key = event.keyCode;
    key = String.fromCharCode(key);
    const regex = /[0-9]|\./;
    if (!regex.test(key)) {
      event.returnValue = false;
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
  }

}
