import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, timeout} from "rxjs";
import {environment} from "../../environments/environment";
import {ApiResponse} from "./api.models";
import {User} from "./user.models";
import {respSelectedFrom} from "../models/estadocivil.models";
import {ApiService} from "./api.service";
import {requestRegistrar} from "../models/registrar.models";

@Injectable({
  providedIn: 'root'
})

export class ReniecService {
  url = 'http//192.168.33.21:8181/reniec/personaByDni'

  constructor(private http: HttpClient, private apiService: ApiService) {
  }

  getDatosReniec(_params: string): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${environment.api.route.consultarDni}?dni=${_params}`).pipe(
      map(m => m.body),
    )
  }

  getEstadoCivil(): Observable<respSelectedFrom[]> {
    return this.apiService.get<ApiResponse<respSelectedFrom[]>>
    (`${environment.api.route.consutlaEstado}?codiEntiEnt=ESTACIVIPER`).pipe(
      map(m => m.body)
    )
  }

  getFactor(): Observable<respSelectedFrom[]> {
    return this.http.get<ApiResponse<respSelectedFrom[]>>(`${environment.api.route.consutlaEstado}?codiEntiEnt=TIPODOCUPAG`)
      .pipe(
        map(m => m.body)
      )
  }

  registrarInscripcion(params: any): Observable<any> {
    return this.apiService.post<requestRegistrar>(`${environment.api.route.registrarInscripcion}`, params).pipe();
  }

}
