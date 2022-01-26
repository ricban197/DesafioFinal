import { Endereco } from './../models/endereco';
import { Clientes } from './../models/clientes';
import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url = 'http://localhost:8080/clientes'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os clientes
  getClientes(): Observable<Clientes[]> {
    return this.httpClient.get<Clientes[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  };

  // Obtem um Cliente pelo id
  getClienteById(id: number): Observable<Clientes> {
    return this.httpClient.get<Clientes>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  };
  endereco!: Endereco;
  // salva um Cliente 
  saveCliente(cli: Clientes): Observable<Clientes> {
    this.endereco ={
      cep: cli.cep,
      logradouro:"",
      complemento:"",
      bairro:"",
      localidade:"",
      uf:"",
      ibge:"",
      gia:"",
      ddd:"",
      siafi:""

    };
    cli.endereco=this.endereco;
    
    return this.httpClient.post<Clientes>(this.url, JSON.stringify(cli), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  };

  // utualiza um cliente
  updateCliente(cli: Clientes): Observable<Clientes> {
    this.endereco ={
      cep: cli.cep,
      logradouro:"",
      complemento:"",
      bairro:"",
      localidade:"",
      uf:"",
      ibge:"",
      gia:"",
      ddd:"",
      siafi:""

    };
    cli.endereco=this.endereco;
    console.log(cli);
    return this.httpClient.put<Clientes>(this.url+'/'+cli.id, JSON.stringify(cli), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  };
  // deleta um cliente
  deleteCliente(cli: Clientes) {
    return this.httpClient.delete<Clientes>(this.url + '/' + cli.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  };

  // Manipulação de erros
  handleError(error: HttpErrorResponse) 
  {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}