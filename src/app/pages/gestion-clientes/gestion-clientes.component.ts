import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TiposIdentificacion } from 'src/app/modelos/Entidades';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-gestion-clientes',
  templateUrl: './gestion-clientes.component.html',
  styleUrl: './gestion-clientes.component.scss'
})
export class GestionClientesComponent {
  listClientes: any[] = [];
  displayedColumns: string[] = ['tipo', 'identificacion', 'nombres', 'apellidos', 'direccion', 'telefono', 'correo', 'opciones'];
  dataSource!: MatTableDataSource<any>;
  formRegistro: any;
  idForm: string = 'idForm';
  age: any;
  campoIdentificacion:boolean = false;

  listTipoIdentificacion: TiposIdentificacion[] = [
    {
      id: '0',
      nombre: 'CC',
    },
    {
      id: '1',
      nombre: 'NIT',
    },
    {
      id: '2',
      nombre: 'CE',
    },
    {
      id: '3',
      nombre: 'PEP',
    },
  ];

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
    this.formRegistro = this.services.cargarFormClientes();
    this.getListClientes();
  }

  /**
     * Método de formulario de registro
     *
     */
  registrar() {
    if (this.formRegistro.pristine) {
      console.log('Sin cambios');
      Swal.fire({ icon: 'info', title: 'No ha hecho ajustes', text: '!' });
    } else {
      if (this.actualizarR) {
        this.services.actualizaCliente(this.formRegistro).subscribe(
          (result: any) => {
            console.log('============>', result);
            this.getListClientes();
            this.formRegistro.reset();
            Swal.fire({ icon: 'info', title: 'Actualizado correctamente', text: 'ok' });
          },
          (error) => {
            console.log('=======error=====>', error);
          }
        );
      }

      if (!this.actualizarR) {
        this.services.registrarClientes(this.formRegistro).subscribe(
          (result: any) => {
            console.log('============>', result);
            this.getListClientes();
            this.formRegistro.reset();
            Swal.fire({ icon: 'info', title: 'Registrado correctamente', text: 'ok' });
          },
          (error) => {
            console.log('=======error=====>', error);
          }
        );
      }
    }
  }

  /**
   * Método de listar clientes
   *
   */

  getListClientes() {
    this.services.getClientes().subscribe(
      (result: any) => {
        //this.viewDateTableEspanol();
        this.listClientes = result;
        this.dataSource = new MatTableDataSource<any>(result);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(`Lsita eror:  ${error}`);
      }
    );

  }

  actualizarR: boolean = false;
  update(confirma: boolean) {
    this.actualizarR = !confirma ? false : true;
  }


  /**
   *
   * Método para filtrar
   * Requerimiento funcional RF05  Gestión Clientes
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
  noEditar:boolean = false;
  editar2(form: any, modal: any) {
    this.noEditar = true;          
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
    this.noEditar = false;
  }

  crear(tipo: string) {

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
        this.services.deleteCliente(id.id).subscribe(
          (result: any) => {
            //this.viewDateTableEspanol();

            this.getListClientes();            
            Swal.fire({icon: 'info', title: 'Eliminado correctamente',  text: 'ok'});             
            this.spinner.hide();            
          },
          (error) => {
            this.spinner.hide();
          }
        );
      } else {
        this.spinner.hide();
      }
    });

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
