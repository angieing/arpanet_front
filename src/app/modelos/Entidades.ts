import { ThemePalette } from "@angular/material/core";

export interface Dependencia {
    id: string;
    fecha: string;
    subtotal: string;
    impuestos: string;
    total: string;
    cliente: string;
    vendedor: string;
    tipo_vendedor: string;
    tipo_clientes:string;
  }


  export interface TiposIdentificacion {
    id:string;
    nombre: string;

  }
