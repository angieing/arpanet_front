import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  comercios: any[] = [];
  listaUsuarios: any[] = [];
  login: any[] = [];
  listaPacientes:any[] = [];

  constructor(
    private formularioNuevo: FormBuilder,
    private formularioTurnos: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }


   //form login
   cargarFormLogin(): FormGroup{
    return this.formularioNuevo.group({
      user: [],
      pass:[]
    });
  }

  //form login
  cargarFormVentas(): FormGroup{
    return this.formularioNuevo.group({
      id: [],
      fecha:[],
      subtotal:[],
      impuestos:[],
      total:[],
      cliente:[],
      vendedor:[],
      tipo_vendedor:[],
      tipo_clientes:[]
    });
  }

  //servicios
  /**
   *
   * @returns Obtener listado de comercios
   */

  getComercios():Observable<any[]>{
    let url = `${environment.urlApiListarComercios}`;
    return this.http.get(url).pipe(
      tap((result:any) => (this.comercios = result)),
      map((result:any) => result)
    );
  }

  getUsuariosTodos() {
    let url = `${environment.urlListaVentas}`;
    return this.http.get(url).pipe(
      tap((result: any) => (this.listaUsuarios = result)),
      map((result: any) => result)
    );
  }

  validarCredenciales(usuario: string, password: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('usuario', usuario);
    queryParams = queryParams.append('password', password);
    let url = `${environment.urlValidarLogin}`;
    return this.http.post(url, '', { params: queryParams }).pipe(
      tap((result: any) => (this.login = result)),
      map((result: any) => result)
    );
  }

   /**
   * Obtener listado de pacientes actuales
   * @returns
   */
   getVentas(): Observable<any[]> {
    let url = `${environment.urlListaVentas}`;
    return this.http.get(url).pipe(
      tap((result: any) => (this.listaPacientes = result)),
      map((result: any) => result)
    );
  }


  registroVentas:any[] = [];
/**
 * Metodo para registrar ventas en oracle
 * @param form
 * @param token
 * @param tipo
 * @returns
 */
  registrarVentas(form: any) {
   console.log('MOSTAR: ',form.value);
    let items = Object.assign(form.value);
    let url = `${environment.urlRegistrarVentas}`;
    console.log('URL: ',url);
    return this.http.post(url, items).pipe(
          tap((result: any) => (this.registroVentas = result)),
          map((result: any) => result)
        );
  }


}
