import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cart } from './cart/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartURL = environment.apiURL + '/cart';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getCartProductsById(id: number): Observable<Cart[]> {
    const url = `${this.cartURL}/order/${id}`;
    return this.http.get<Cart[]>(url).pipe(
      tap(() => console.log('fetched cart products')),
      catchError(this.handleError<Cart[]>('getCartProductsById', []))
    );
  }

  addCartProduct(cartProduct: Cart): Observable<Cart> {
    const url = `${this.cartURL}`;
    return this.http.post<Cart>(url, cartProduct, this.httpOptions).pipe(
      tap(() => console.log(`added cart product`)),
      catchError(this.handleError<Cart>('addCartProduct'))
    );
  }

  deleteCartProduct(cartProduct: Cart | number): Observable<Cart> {
    const id = typeof cartProduct === 'number' ? cartProduct : cartProduct.id;
    const url = `${this.cartURL}/${id}`;

    return this.http.delete<Cart>(url, this.httpOptions).pipe(
      tap(() => console.log(`delete cart product id=${id}`)),
      catchError(this.handleError<Cart>('deleteCartProduct'))
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
