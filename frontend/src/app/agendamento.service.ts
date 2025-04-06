import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private apiUrl = 'http://127.0.0.1:8000/api/enviar-agenda'

  constructor(private http: HttpClient) { }

  // Metodo do serviço de agendamento
  agendarConsulta(dados: any, recaptchaToken: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-ReCaptcha-Token': recaptchaToken
    });
    
    return this.http.post(this.apiUrl, dados, { headers: headers });
  }
}
