import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

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
    /*
    private route : ActivatedRoute,
    private spinner : NgxSpinnerService,
    public router : Router,
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
    console.log(this.formLogin);
    console.log( this.formLogin.get('user').value);
    console.log( this.formLogin.get('pass').value);
    if(this.formLogin.get('user').value == environment.user && this.formLogin.get('pass').value == environment.pass){
      this.router.navigate(['/', 'generar-turnos']);
      localStorage.setItem('user', this.formLogin.get('user').value);
    }else{
      this.toastr.info('ver');
      Swal.fire({icon: 'error', title: 'Error', text: 'Usuario o id de la sesión invalido'});
    }
  }

}
