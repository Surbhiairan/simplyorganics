import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { Store } from '../models/store';

@Injectable()
export class StoreService {

  private measuresUrl = 'http://localhost:3000/storeview';  // URL to web api

  constructor(
    private http: HttpClient, private messageService: MessageService) { }

  /** GET measures from the server */
  getStore(): Observable<Store[]> {
    return this.http.get<Store[]>(this.measuresUrl)
      .pipe(
      tap(measures => this.log(`fetched Store`)),
      catchError(this.handleError('getStore', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('StoreService: ' + message);
  }

}
