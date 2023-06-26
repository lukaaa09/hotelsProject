import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorhandlerInterceptor implements HttpInterceptor {

  constructor(private _toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.error instanceof ErrorEvent) {
            console.log('error event')
          }else {
            switch (err.status) {
              case 401: //Unauthorized
                console.log(err.statusText)
                break;
              case 403: //Forbidden
                console.log(err.statusText)
                break;
              case 404: //Not Found
                console.log(err.statusText)
                this._toastr.error(err.message + ' occurred')
                break;
              case 503: //Server Error
                console.log(err.statusText)
                break;
            }
          }
        }else {
          console.log('error occurred')
        }
        return throwError(() => new Error(err.statusText))
      })
    );
  }
}
