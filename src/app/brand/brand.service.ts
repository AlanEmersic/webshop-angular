import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Brand } from './brand.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private brandURL = environment.apiURL + '/brands';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.brandURL).pipe(
      tap((_) => console.log('fetched brands')),
      catchError(this.handleError<Brand[]>('getBrands', []))
    );
  }

  getBrandById(id: number): Observable<Brand> {
    const url = `${this.brandURL}/${id}`;
    return this.http.get<Brand>(url).pipe(
      tap((_) => console.log('fetched brand')),
      catchError(this.handleError<Brand>('getBrandById'))
    );
  }

  addBrand(brand: Brand): Observable<Brand> {
    const url = `${this.brandURL}`;
    return this.http.post<Brand>(url, brand, this.httpOptions).pipe(
      tap(() => console.log(`added brand`)),
      catchError(this.handleError<Brand>('addBrand'))
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
