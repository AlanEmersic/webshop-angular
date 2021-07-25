import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersURL = environment.apiURL + '/orders';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersURL).pipe(
      tap(() => console.log('fetched orders')),
      catchError(this.handleError<Order[]>('getOrders', []))
    );
  }

  getOrderById(id: number): Observable<Order> {
    const url = `${this.ordersURL}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap(() => console.log('fetched order')),
      catchError(this.handleError<Order>('getOrderById'))
    );
  } 

  addOrder(order: Order): Observable<Order> {
    const url = `${this.ordersURL}`;    
    return this.http.post<Order>(url, order, this.httpOptions).pipe(
      tap(() => console.log(`added order`)),
      catchError(this.handleError<Order>('addOrder'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      return of(result as T);
    };
  }
}
