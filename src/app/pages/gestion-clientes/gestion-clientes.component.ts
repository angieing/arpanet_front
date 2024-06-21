import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-gestion-clientes',
  templateUrl: './gestion-clientes.component.html',
  styleUrl: './gestion-clientes.component.scss'
})
export class GestionClientesComponent {
  listClientes : any[]=[];
  displayedColumns: string[] = ['tipo','identificacion', 'nombres', 'apellidos', 'direccion', 'telefono', 'correo',  'opciones'];
  dataSource!: MatTableDataSource<any>;
  formRegistro: any;
  idForm: string = 'idForm';
  age:any;
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
  ngOnInit(): void {
    this.formRegistro = this.services.cargarFormClientes();
    this.getListClientes();
  }

  /**
     * Método de formulario de registro
     *
     */
  registrar(){
    this.services.registrarClientes(this.formRegistro).subscribe(
      (result:any)=>{
        console.log('============>', result);
      },
      (error)=>{
        console.log('=======error=====>', error);
      }
    );
  }

  /**
   * Método de listar clientes
   *
   */

  getListClientes(){
    this.services.getClientes().subscribe(
      (result: any) => {
        //this.viewDateTableEspanol();
        this.listClientes = result;
        this.dataSource = new MatTableDataSource<any>(result);
      },
      (error) => {
        console.log(`Lsita eror:  ${error}`);
      }
    );

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

  /**Método para botón editar */

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
  
  }









}
