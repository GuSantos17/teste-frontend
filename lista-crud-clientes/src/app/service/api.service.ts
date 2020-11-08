import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cliente } from 'src/model/cliente';
import { Cep } from 'src/model/cep';

const httpOptions = { 
  headers: new HttpHeaders({'Contenty-Type':'application/json'})
 };

 const apiUrl = 'https://localhost:44342/api/cliente/';
 const cepUrl = 'https://viacep.com.br/ws/';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getClientes (): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(apiUrl)
      .pipe(
        tap(clientes => console.log('leu os clientes')),
        catchError(this.handleError('getClientes', []))
        
      );
  }

  getCliente (id): Observable<Cliente> {
    return this.http.get<Cliente>(apiUrl + id).pipe(
      tap(cliente => console.log('leu o cliente id=' + id)),
      catchError(this.handleError<Cliente>('getCliente id=${id}'))
    );
  }

  addCliente (cliente): Observable<Cliente> {
    return this.http.post<Cliente>(apiUrl, cliente, httpOptions).pipe(
      tap((cliente: Cliente) => console.log('Adicionou um cliente')),
      catchError(this.handleError<Cliente>('addCliente')) 
    );
  }

  updateCliente (id, cliente): Observable<any> {
    return this.http.put(apiUrl + id, cliente, httpOptions).pipe(
      tap(_ => console.log('Atualiza o cliente com id=${id}')),
      catchError(this.handleError<any>('updateCliente'))
    );
  }

  deleteCliente (id): Observable<Cliente> {
    return this.http.delete<Cliente>(apiUrl + id, httpOptions).pipe(
      tap(_ => console.log('remove o cliente com id=${id}')),
      catchError(this.handleError<Cliente>('deleteCliente'))
    );
  }

  getCep (cep): Observable<Cep> {
    return this.http.get<Cep>(cepUrl + cep + '/json/').pipe(
      tap(_ => console.log('Buscou o cep: ' + cep)),
      catchError(this.handleError<any>('getCep'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
