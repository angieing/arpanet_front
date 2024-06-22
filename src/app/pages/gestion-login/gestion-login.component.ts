import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-gestion-login',
  templateUrl: './gestion-login.component.html',
  styleUrls: ['./gestion-login.component.scss'],
})
export class GestionLoginComponent implements OnInit{

  prueba:string="e";
  hide:any = true;

  public formLogin: any;

  lbl_login:string="Iniciar sesión";
  public lbl_usuario : string = environment.usuario;
  public lbl_contrasena : string = environment.lbl_pass;

  constructor(
    public serviceLogin : ServiciosService,
    
    private route : ActivatedRoute,
    private spinner : NgxSpinnerService,
    /*public router : Router,
    public toastr : ToastrService,
    private serviceAuth : AutenticacionService,
    private modal : NgbModal,
    private changeDetector: ChangeDetectorRef,
    config: NgbModalConfig*/ 

    public router : Router,
    public toastr : ToastrService
    )
    {
      //config.backdrop = 'static';
    }

  ngOnInit():void {
    this.formLogin = this.serviceLogin.cargarFormLogin();
  }

  enviarDatos(){
    this.spinner.show();
    this.serviceLogin.validarCredenciales(this.formLogin.get('user').value,  this.formLogin.get('pass').value).subscribe(
      (result:any)=>{
        this.spinner.hide();        
        //localStorage.setItem('rolUser',result.obj[0].nombre);
        this.router.navigate(['/', 'gestion-principal']);
        //localStorage.setItem('user', this.formLogin.get('user').value);
        //localStorage.setItem('token', result.token);
        //localStorage.setItem('creado','ok');
      },
      (error)=>{        
        this.spinner.hide();
        this.formLogin.reset();
        localStorage.clear();
        if(error.status == 0){
          Swal.fire({icon: 'error', title: error.status,  text: 'Servicio no disponible'});
        }

        if(error.status != 0){
          Swal.fire({icon: 'error', title: error == null ? error.status : error.error.status, text: error == null ? 'Error en la peticion del servicio' : error.error.msn});
        }
      }
    );


  }

}
