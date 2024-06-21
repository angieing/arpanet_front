import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
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
  respuestas:any[] =[];

  constructor(
    private formularioNuevo: FormBuilder,
    private formularioVendedores: FormBuilder,
    private formularioClientes: FormBuilder,
    private formularioProductos: FormBuilder,
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

  //form ventas
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

  //form vendedores
  cargarFormVededores(): FormGroup{
    return this.formularioVendedores.group({
      id: [],
      tipoIdentificacion:[],
      nombres:[],
      apellidos:[],
      direccion:[],
      telefono:[],
      correo:['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  //form clientes
  cargarFormClientes(): FormGroup{
    return this.formularioClientes.group({
      id: [],
      tipoIdentificacion:[],
      nombres:[],
      apellidos:[],
      direccion:[],
      telefono:[],
      correo:['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  //form productos
  cargarFormProductos(): FormGroup{
    return this.formularioProductos.group({
      id: [],
      nombre:[],
      porcentaje_impuesto:[]
    });
  }


  //servicios
  /**
   *
   * @returns Obtener listado de comercios
   */
/*
  getComercios():Observable<any[]>{
    let url = `${environment.urlApiListarComercios}`;
    return this.http.get(url).pipe(
      tap((result:any) => (this.comercios = result)),
      map((result:any) => result)
    );
  }

  */

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
   * Obtener listado de ventas actuales
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
   console.log('MOSTRAR: ',form.value);
    let items = Object.assign(form.value);
    let url = `${environment.urlRegistrarVentas}`;
    console.log('URL: ',url);
    return this.http.post(url, items).pipe(
          tap((result: any) => (this.registroVentas = result)),
          map((result: any) => result)
        );
  }

  listaVendedores:any[] = [];
     /**
   * Obtener listado de vendedores actuales
   * @returns
   */
     getVendedores(): Observable<any[]> {
      let url = `${environment.urlListarVendedores}`;
      return this.http.get(url).pipe(
        tap((result: any) => (this.listaVendedores = result)),
        map((result: any) => result)
      );
    }

  registroVendedores:any[] = [];
  /**
   * Metodo para registrar vendedores en oracle
   * @param form
   * @param token
   * @param tipo
   * @returns
   */
  registrarVendedores(form: any) {
    console.log('MOSTRAR: ',form.value);
     let items = Object.assign(form.value);
     let url = `${environment.urlRegistrarVendedores}`;
     console.log('URL: ',url);
     return this.http.post(url, items).pipe(
           tap((result: any) => (this.registroVendedores = result)),
           map((result: any) => result)
         );
   }

   listaClientes:any[] = [];
     /**
   * Obtener listado de clientes actuales
   * @returns
   */
     getClientes(): Observable<any[]> {
      let url = `${environment.urlListarClientes}`;
      return this.http.get(url).pipe(
        tap((result: any) => (this.listaClientes = result)),
        map((result: any) => result)
      );
    }

  registroClientes:any[] = [];
  actualizarClientes:any [] =[];
  /**
   * Metodo para registrar vendedores en oracle
   * @param form
   * @param token
   * @param tipo
   * @returns
   */
  registrarClientes(form: any) {
    console.log('MOSTRAR: ',form.value);
     let items = Object.assign(form.value);
     let url = `${environment.urlRegistrarClientes}`;
     console.log('URL: ',url);
     return this.http.post(url, items).pipe(
           tap((result: any) => (this.registroClientes = result)),
           map((result: any) => result)
         );
   }


   actualizaVentas(form: any) {
    console.log('MOSTRAR: ',form.value);
     let items = Object.assign(form.value);
     let url = `${environment.urlActualizarVentas}${form.value.id}`;
     console.log('URL: ',url);
     return this.http.put(url, items).pipe(
           tap((result: any) => (this.registroVentas = result)),
           map((result: any) => result)
         );
   }

   actualizaVendedor(form: any) {
    console.log('MOSTRAR: ',form.value);
     let items = Object.assign(form.value);
     let url = `${environment.urlActualizarVendedores}${form.value.id}`;
     console.log('URL: ',url);
     return this.http.put(url, items).pipe(
           tap((result: any) => (this.registroVendedores = result)),
           map((result: any) => result)
         );
   }

   actualizaCliente(form: any) {
    console.log('MOSTRAR: ',form.value);
     let items = Object.assign(form.value);
     let url = `${environment.urlActualizarClientes}${form.value.id}`;
     console.log('URL: ',url);
     return this.http.put(url, items).pipe(
           tap((result: any) => (this.actualizarClientes = result)),
           map((result: any) => result)
         );
   }

   actualizaProducto(form: any) {
    console.log('MOSTRAR: ',form.value);
     let items = Object.assign(form.value);
     let url = `${environment.urlActualizarProductos}${form.value.id}`;
     console.log('URL: ',url);
     return this.http.put(url, items).pipe(
           tap((result: any) => (this.registroProductos = result)),
           map((result: any) => result)
         );
   }

  deleteVenta(id: any) {
    let url = `${environment.urlDeleteVentas}${id}`;
    return this.http
      .request('delete', url)
      .pipe(
        tap((result: any) => (this.respuestas = result)),
        map((result: any) => result)
      );
  }

  deleteVendedor(id: any) {
    let url = `${environment.urlDeleteVendedores}${id}`;
    return this.http
      .request('delete', url)
      .pipe(
        tap((result: any) => (this.respuestas = result)),
        map((result: any) => result)
      );
  }

  deleteCliente(id: any) {
    let url = `${environment.urlDeleteClientes}${id}`;
    return this.http
      .request('delete', url)
      .pipe(
        tap((result: any) => (this.respuestas = result)),
        map((result: any) => result)
      );
  }

  deleteProducto(id: any) {
    let url = `${environment.urlDeleteProductos}${id}`;
    return this.http
      .request('delete', url)
      .pipe(
        tap((result: any) => (this.respuestas = result)),
        map((result: any) => result)
      );
  }



  listaProductos:any[] = [];
     /**
   * Obtener listado de clientes actuales
   * @returns
   */
     getProductos(): Observable<any[]> {
      let url = `${environment.urlListarProductos}`;
      return this.http.get(url).pipe(
        tap((result: any) => (this.listaProductos = result)),
        map((result: any) => result)
      );
    }

  registroProductos:any[] = [];
  /**
   * Metodo para registrar vendedores en oracle
   * @param form
   * @param token
   * @param tipo
   * @returns
   */
  registrarProductos(form: any) {
    console.log('MOSTRAR: ',form.value);
     let items = Object.assign(form.value);
     let url = `${environment.urlRegistrarProductos}`;
     console.log('URL: ',url);
     return this.http.post(url, items).pipe(
           tap((result: any) => (this.registroProductos = result)),
           map((result: any) => result)
         );
   }


   listarIndicadores1:any[] = [];
     /**
   * Buscar todas las ventas por un año específico
   * @returns
   */
     getBuscarPorAnio(anio:any): Observable<any[]> {
      let url = `${environment.urlListarPorAnio}${anio}`;
      return this.http.get(url).pipe(
        tap((result: any) => (this.listarIndicadores1 = result)),
        map((result: any) => result)
      );
    }

    listarIndicadores2:any[] = [];
     /**
   *  Cual es el vendedor que más ha vendido
   * @returns
   */
     getBuscarVendedorMasVende(): Observable<any[]> {
      let url = `${environment.urlListarVendedorMasVendido}`;
      return this.http.get(url).pipe(
        tap((result: any) => (this.listarIndicadores2 = result)),
        map((result: any) => result)
      );
    }

    listarIndicadores3:any[] = [];
    /**
  *   Cuanto se ha vendido en un año específico

  * @returns
  */
    getPorAnioEspecifico(anio:any): Observable<any[]> {
     let url = `${environment.urlListarPorAnioEspecifico}${anio}`;
     return this.http.get(url).pipe(
       tap((result: any) => (this.listarIndicadores3 = result)),
       map((result: any) => result)
     );
   }

   listarIndicadores4:any[] = [];
   /**
 *    Promedio ventas por cliente

 * @returns
 */
   getPromedioVentas(): Observable<any[]> {
    let url = `${environment.urlListPromedioVentasCliente}`;
    return this.http.get(url).pipe(
      tap((result: any) => (this.listarIndicadores4 = result)),
      map((result: any) => result)
    );
  }


  listarIndicadores5:any[] = [];
    /**
    * Cuanto se ha vendido en un año y mes específico
    * @returns
    */
  getlistarCantidadVentasAnioMesEspecifico(): Observable<any[]> {
   let url = `${environment.urlListCantidadVentasAnioMes}`;
   return this.http.get(url).pipe(
     tap((result: any) => (this.listarIndicadores4 = result)),
     map((result: any) => result)
   );
 }

}
