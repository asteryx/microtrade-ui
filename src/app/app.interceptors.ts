import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserToken } from './app.models';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from "rxjs/observable/TimerObservable";

import 'rxjs/add/operator/do';


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor(public uToken: UserToken) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: this._get_headers(this.uToken)
    });
    return next.handle(request);
  }
  _get_headers(uToken: UserToken){
    let headers = {'Content-Type': 'application/json'};

    if (uToken.token != ''){
      headers['Authorization'] = `Token ${uToken.token}`; 
    }
   return headers;
  }
}


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(public router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          
          TimerObservable.create(3000).subscribe(() => {
            if(this.router.url.slice(0, 6) !== '/login'){
                this.router.navigate(['/logout']);
              }
          });

        }
      }
    });
  }
}
