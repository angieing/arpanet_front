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

@Component({
  selector: 'app-gestion-principal',
  templateUrl: './gestion-principal.component.html',
  styleUrl: './gestion-principal.component.scss'
})
export class GestionPrincipalComponent implements OnInit{
  listVentas : any[]=[];
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
      },
      (error) => {
        console.log(`Lsita eror:  ${error}`);
      }
    );
  }

  consultar(){
    alert('se esta consultado ...');
  }


}
