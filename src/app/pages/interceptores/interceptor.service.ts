import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  

  constructor() { }

  intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
    let httpReq:any   
    if(!environment.production){
      httpReq = req.clone({
        //url: req.url.replace((req.url.search(environment.urlProxy) > -1 ? environment.urlProxy :  environment.urlLocal) , (req.url.search(environment.urlProxy) > -1 ? environment.urlProxy :  environment.urlLocal))
        url: req.url.replace(environment.urlLocal, environment.urlTunelLocal)
      });
    }else if(environment.production){
      /*httpReq = req.clone({
        url: req.url.replace((req.url.search(environment.urlLocal) > -1 ? environment.urlLocal :  environment.urlProxy) , environment.urlLocalProd)
      });*/
      httpReq = req.clone({
        //url: req.url.replace((req.url.search(environment.urlProxy) > -1 ? environment.urlProxy :  environment.urlLocal) , (req.url.search(environment.urlProxy) > -1 ? environment.urlProxy :  environment.urlLocal))
        url: req.url.replace(environment.urlLocal, environment.urlTunelLocal)
      });
    }
    
    return next.handle(httpReq);
  }
}
