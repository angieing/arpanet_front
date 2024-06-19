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
  listVentas : any[]=[];
  displayedColumns: string[] = ['position', 'fecha', 'subtotal', 'impuestos', 'total', 'cliente', 'vendedor'];
  dataSource!: MatTableDataSource<any>;

   // @ViewChild(DataTableDirective, { static: false })
  //dtElements: any = DataTableDirective;
  //isDtInitializeds: boolean = false;
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
    this.getListVentas();
  }

  editar(uno:any,dos:any){}
  delete(no:any,dos:any){}

  getListVentas() {
    this.services.getVentas().subscribe(
      (result: any) => {
        //this.viewDateTableEspanol();
        this.listVentas = result;
        this.dataSource = new MatTableDataSource<any>(result);
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
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
    this.filtro = filterValue
  }

}
