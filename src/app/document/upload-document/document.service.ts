import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:5000/api';

  uploadDocument(data) {
    
    return this.http.post(`${this.url}/document`, data).pipe(
      catchError((error:Observable<Response>) => {
        //console.log(error);
        // return throwError(error);
        return of(error);
      }));
  }

  private handleError(error: any) { 
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(error);
  }

}
