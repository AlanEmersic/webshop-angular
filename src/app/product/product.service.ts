import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productURL = environment.apiURL + '/products';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productURL).pipe(
      tap(() => console.log('fetched products')),
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.productURL}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(() => console.log('fetched product')),
      catchError(this.handleError<Product>('getProductById'))
    );
  }

  addProduct(product: Product): Observable<Product> {
    const url = `${this.productURL}`;
    return this.http.post<Product>(url, product, this.httpOptions).pipe(
      tap(() => console.log(`added product`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  deleteProduct(product: Product | number): Observable<Product> {
    const id =
      typeof product === 'number' ? product : product.id;
    const url = `${this.productURL}/${id}`;

    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap(() => console.log(`delete product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
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
