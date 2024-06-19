import { HttpClient } from '@angular/common/http';
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
  cargarFormTurnos(): FormGroup{
    return this.formularioNuevo.group({
      comercios: [],
      servicios:[],
      fechaInicial:[],
      fechaFinal:[]
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
}
