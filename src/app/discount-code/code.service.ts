import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Code } from './code.model';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  private codeURL = environment.apiURL + '/discount-codes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getCodes(): Observable<Code[]> {
    return this.http.get<Code[]>(this.codeURL).pipe(
      tap(() => console.log('fetched codes')),
      catchError(this.handleError<Code[]>('getCodes', []))
    );
  }

  getCodeByName(code: string): Observable<Code> {
    const url = `${this.codeURL}/code/${code}`;
    return this.http.get<Code>(url).pipe(
      tap(() => console.log('fetched code')),
      catchError(this.handleError<Code>('getCodeByName'))
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
