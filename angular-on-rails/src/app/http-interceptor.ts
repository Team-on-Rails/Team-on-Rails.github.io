import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Modify the request headers
    const modifiedRequest = request.clone({
      setHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': environment.apiKeyUser1
      }
    });

    // Pass the modified request to the next interceptor or the HTTP handler
    return next.handle(modifiedRequest);
  }
}

