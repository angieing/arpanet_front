// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlApi: 'http://localhost:8085/api/tecnica/entrar',
  urlApiListarComercios: 'http://localhost:8085/api/tecnica/listarcomercios',
  urlListaVentas:'http://localhost:9091/ventas/listar',
  urlValidarLogin: 'http://localhost:9091/login/validar-credenciales',
  urlRegistrarVentas: 'http://localhost:9091/ventas/crear',
  urlRegistrarVendedores: 'http://localhost:9091/vendedores/crear',
  urlListarVendedores: 'http://localhost:9091/vendedores/listar',
  urlRegistrarClientes: 'http://localhost:9091/clientes/crear',
  urlListarClientes: 'http://localhost:9091/clientes/listar',


  //etiquetas formularios
  usuario: 'Usuario',
  lbl_pass: 'Ingrese su contraseña',
  //msn


  //credenciales
  user: 'admin',
  pass: 'admin'
}
