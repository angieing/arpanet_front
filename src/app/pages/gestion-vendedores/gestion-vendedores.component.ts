import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Dependencia, TiposIdentificacion } from 'src/app/modelos/Entidades';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-gestion-vendedores',
  templateUrl: './gestion-vendedores.component.html',
  styleUrl: './gestion-vendedores.component.scss',
})
export class GestionVendedoresComponent implements OnInit {
  listVendedores: any[] = [];
  listVentas: any[] = [];
  displayedColumns: string[] = [
    'position',
    'identificacion',
    'nombres',
    'apellidos',
    'direccion',
    'telefono',
    'correo',
    'opciones',
  ];
  dataSource!: MatTableDataSource<any>;
  formRegistro: any;
  idForm: string = 'idForm';
  age: any;
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

  //@ViewChild(MatPaginator) paginator: MatPaginator<any>;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  // @ViewChild(DataTableDirective, { static: false })
  //dtElements: any = DataTableDirective;
  //isDtInitializeds: boolean = false;
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
    this.formRegistro = this.services.cargarFormVededores();
    this.getListVendedores();

    this.filterTable();
  }

  ngAfterViewInit() {}

  /**
   * Método de formulario de registro
   *
   */
  registrar() {
    console.log('=====>', this.formRegistro.value.id);
    if (this.formRegistro.pristine) {
      console.log('Sin cambios');
      this.toastr.info('No ha cambiado nada');
    } else {
      if (this.actualizarR) {
        this.services.actualizaVendedor(this.formRegistro).subscribe(
          (resultup: any) => {
            console.log('============>', resultup);
            Swal.fire({icon: 'info', title: 'Actualizado correctamente',  text: 'ok'});             
            this.getListVendedores();
          },
          (errorup) => {
            console.log('=======ERROR=====>', errorup);
          }
        );
      }

      if (!this.actualizarR) {
        this.services.registrarVendedores(this.formRegistro).subscribe(
          (result: any) => {
            console.log('============>', result);
            this.getListVendedores();
            Swal.fire({icon: 'info', title: 'Registrado correctamente',  text: 'ok'});             
          },
          (error) => {
            console.log('=======error=====>', error);
          }
        );
      }
    }
  }

  editar(uno: any, dos: any) {}
  delete(no: any, dos: any) {}

  getListVendedores() {
    this.services.getVendedores().subscribe(
      (result: any) => {
        //this.viewDateTableEspanol();
        this.listVendedores = result;
        this.dataSource = new MatTableDataSource<any>(result);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(`Lsita eror:  ${error}`);
      }
    );
  }

  consultar() {    
  }

  filtro: any = '';
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.filtro = filterValue;
  }

  obtenerFuncionDeBusqueda() {
    let funcionFiltrado = (data: Dependencia, filtro: string): boolean => {
      if (filtro) {
        for (let i = 0; i < this.displayedColumns.length; i++) {
          if (this.displayedColumns[i] == 'id') {
            continue;
          }
          const valor: string = data[
            this.displayedColumns[i] as keyof typeof data
          ]
            .toString()
            .toLowerCase();
          if (valor.indexOf(filtro) != -1) {
            return true;
          }
        }
      }
      return false;
    };
    return funcionFiltrado;
  }

  regresar() {
    this.router.navigate(['/', 'gestion-principal']);
  }

  /**
   * Cierra modales
   * @param modal
   */
  cerrarModal(modal: any) {
    this.modal.dismissAll(modal);
  }

  editar2(form: any, modal: any) {
    console.log(form);
    for (let obj in form) {
      for (let f in this.formRegistro.value) {
        console.log(obj);
        if (f == obj) {
          this.formRegistro.get(obj).setValue(form[obj]);
          if (f == 'tipoIdentificacion') {
            this.formRegistro.get(obj).setValue((form[obj] = +form[obj]));
          }
        }
      }
    }
    let enviarIdRegistro = this.formRegistro.value;
    enviarIdRegistro.id = form.id;

    this.modal.open(modal, {
      size: 'xl',
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
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
        this.services.deleteVendedor(id.id).subscribe(
          (result: any) => {
            //this.viewDateTableEspanol();

            this.getListVendedores();            
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

  filterTable() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return (
        data.id.toLowerCase().includes(filter) ||
        data.fecha.toLowerCase().includes(filter)
      );
    };
  }

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
}
