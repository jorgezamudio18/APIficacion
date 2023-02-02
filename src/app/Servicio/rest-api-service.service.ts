import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ICommonResponse} from  '../Interfaces/icommon-response';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestApiServiceService {
  baseUrl = 'https://localhost:44328/api/';

  constructor(private http: HttpClient) {}

  public Get(route: string): Observable<ICommonResponse> {
    return this.http.get<ICommonResponse>(this.baseUrl + route)
                    .pipe(catchError(this.handleError));
  }

  public Delete(route: string): Observable<ICommonResponse> {
    return this.http.delete<ICommonResponse>(this.baseUrl + route)
                    .pipe(catchError(this.handleError));
  }

  public Post(route: string, ob: any = {}, alterBaseUrl = ''): Observable<ICommonResponse> {
    let serverUrl = alterBaseUrl.trim() == '' ? this.baseUrl + route : alterBaseUrl + route;
    return this.http.post<ICommonResponse>(serverUrl, ob)
                    .pipe(catchError(this.handleError));
  }

  public Put(route: string, ob: any = {}): Observable<ICommonResponse> {
    return this.http.put<ICommonResponse>(this.baseUrl + route, ob)
                    .pipe(catchError(this.handleError));
  }



  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${err.status}, ` +
        `body was: ${err.error}`);
    }
    return throwError(() => err);
  }
}
