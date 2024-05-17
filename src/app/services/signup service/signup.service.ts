import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private baseUrl = environment.baseUrl + '/Korisnik';
  constructor(private http: HttpClient) { }

  dodajKorisnika(korisnik: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    return this.http.post<any>(this.baseUrl + '/dodaj-korisnika', korisnik, httpOptions);
  }

  checkEmailExists(email: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    return this.http.get<boolean>(`${this.baseUrl}/email-exists/${email}`, httpOptions);
  }
}
