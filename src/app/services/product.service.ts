import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { Product } from '../models/product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {

  private measuresUrl = 'http://localhost:3000/productslist';  // URL to web api

  constructor(
    private http: HttpClient, private messageService: MessageService) { }

  /** GET measures from the server */
  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.measuresUrl)
      .pipe(
      tap(measures => this.log(`fetched products`)),
      catchError(this.handleError('getProduct', []))
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
    this.messageService.add('ProductService: ' + message);
  }


}
