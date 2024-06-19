import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-gestion-clientes',
  templateUrl: './gestion-clientes.component.html',
  styleUrl: './gestion-clientes.component.scss'
})
export class GestionClientesComponent {
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
  regresar(){
    this.router.navigate(['/', 'gestion-principal'])
  }
}
