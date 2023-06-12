  import { Injectable } from '@angular/core';
import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('https://maps.googleapis.com/maps/api/js')) {
      return next.handle(request);
    }

    const authToken = this.cookieService.get('AccessToken');
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + authToken
        }
      });
    }
    return next.handle(request);
  }
}
