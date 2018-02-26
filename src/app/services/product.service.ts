import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { Product , ProdQuant} from '../models/product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {

  private measuresUrl = 'http://localhost:3002/api/productslist';  // URL to web api
  private prodpricequantityurl = 'http://localhost:3002/api/productquantlist';
  private ppqurl = 'http://localhost:3002/api/ppqlist';

  constructor(
    private http: HttpClient, private messageService: MessageService) { }

    getFeaturedProduct(): Observable<Product[]> {
      //const currencyId = localStorage.getItem('currency');
      //console.log('in get product=================', currencyId);
      //const url = `${this.measuresUrl}/${currencyId}`;
      return this.http.get<Product[]>('http://localhost:3002/api/featuredproducts')
        .pipe(
        tap(measures => this.log(`fetched products`)),
        catchError(this.handleError('getProduct', []))
        );
    }

    saveFeaturedProducts(featuredProducts){
      let body = JSON.stringify(featuredProducts);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log("in save featuredProducts service==========================",body);
      return this.http.post('http://localhost:3002/api/savefeaturedproducts', body, httpOptions)
                      .map((res: Response) => res)
                      .catch(this.handleErrors);
    }
    
    getBasketProduct(): Observable<Product[]> {
      //const currencyId = localStorage.getItem('currency');
      //console.log('in get product=================', currencyId);
      //const url = `${this.measuresUrl}/${currencyId}`;
      return this.http.get<Product[]>('http://localhost:3002/api/basketproducts')
        .pipe(
        tap(measures => this.log(`fetched products`)),
        catchError(this.handleError('getProduct', []))
        );
    }

    saveBasketProducts(basketProducts){
      let body = JSON.stringify(basketProducts);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log("in save basket products service==========================",body);
      return this.http.post('http://localhost:3002/api/savebasketproducts', body, httpOptions)
                      .map((res: Response) => res)
                      .catch(this.handleErrors);
    }

  
  /** GET measures from the server */
  getProduct(): Observable<Product[]> {
    const currencyId = localStorage.getItem('currency');
    console.log('in get product=================', currencyId);
    const url = `${this.measuresUrl}/${currencyId}`;
    return this.http.get<Product[]>(url)
      .pipe(
      tap(measures => this.log(`fetched products`)),
      catchError(this.handleError('getProduct', []))
      );
  }

  getPPQList(): Observable<Product[]> {
    const currencyId = localStorage.getItem('currency');
    console.log('in get product=================', currencyId);
    // const url = `${this.measuresUrl}/${currencyId}`;
    return this.http.get<Product[]>(this.ppqurl)
      .pipe(
      tap(measures => this.log(`fetched products`)),
      catchError(this.handleError('getProduct', []))
      );
  }

  getPPQ(id: number): Observable<ProdQuant[]> {
    const currencyId = localStorage.getItem('currency');
    console.log('inside getProductPriceQuantity===================================');
    const url = `${this.ppqurl}/${id}/${currencyId}`;
    return this.http.get<ProdQuant[]>(url)
      .pipe(
      tap(measures => this.log(`fetched products`)),
      catchError(this.handleError('getProduct', []))
      );
  }

  getProductPriceQuantity(id: number): Observable<ProdQuant[]> {
    const currencyId = localStorage.getItem('currency');
    console.log('inside getProductPriceQuantity===================================');
    const url = `${this.prodpricequantityurl}/${id}/${currencyId}`;
    return this.http.get<ProdQuant[]>(url)
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

  private handleErrors (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    return Observable.throw(error || "Server Error");
  }

}
