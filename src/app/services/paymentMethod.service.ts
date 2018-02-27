import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { PaymentMethod } from '../models/payment-method';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'X-Api-Key': '6a881bb5d359ed0f904694cc7b9a576c',
                                'X-Auth-Token': 'b377ba7b1f2b6f293358b1c7fae703ee',
                                'Access-Control-Allow-Origin': 'http://localhost:8085',
                                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT' })
};

@Injectable()
export class PaymentService {
    state: number;
    constructor(private http: HttpClient, private messageService: MessageService) { }

    /** GET Countries from the server */
    getPayment(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:3002/api/paymentmethod')
            .pipe(
            tap(measures => this.log(`fetched Inventory`)),
            catchError(this.handleError('getInventory', []))
            );
    }

    postPayment(order): Observable<any> {
        return this.http.post<any>('https://www.instamojo.com/api/1.1/payment-requests', order, httpOptionsHeader).pipe(
            catchError(this.handleError<any>('addHero'))
        );
    }

    payInsta(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:3002/api/paymentmethod')
            .pipe(
            tap(measures => this.log(`fetched Inventory`)),
            catchError(this.handleError('getInventory', []))
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
        this.messageService.add('InventoryService: ' + message);
    }
}
