import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KlijentService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getFaktureZaKlijenta(id: number): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    const url = `${this.baseUrl}/Fakture/fakture-za-klijenta/${id}`;
    return this.http.get<any[]>(url, httpOptions);
  }

  dodajReklamu(reklama: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    return this.http.post<any>(this.baseUrl + '/Klijent/dodaj-reklamu', reklama, httpOptions);
  }
  getReklameByKlijentId(klijentId: number): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    return this.http.get<any[]>(`${this.baseUrl}/Klijent/klijent-reklame/${klijentId}`, httpOptions);
  }
  deleteReklama(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    const url = `${this.baseUrl}/Klijent/obrisi-reklamu/${id}`;
    return this.http.delete(url, httpOptions);
  }

  kreirajFakturu(faktura: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    return this.http.post<any>(`${this.baseUrl}/Fakture/kreiraj-fakturu`, faktura, httpOptions);
  }

  getFaktureZaAdmina(id: number): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    const url = `${this.baseUrl}/Fakture/fakture-za-admina/${id}`;
    return this.http.get<any[]>(url, httpOptions);
  }
  // getFaktureZaKlijenta(id: number): Observable<any[]> {
  //   const url = `${this.baseUrl}/Fakture/fakture-za-klijenta/${id}`;
  //   return this.http.get<any[]>(url);
  // }

  getNeodobreneReklame(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    const url = `${this.baseUrl}/Klijent/neodobrene-reklame`;
    return this.http.get<any[]>(url, httpOptions);
  }
  getOdobreneReklame(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    const url = `${this.baseUrl}/Klijent/odobrene-reklame`;
    return this.http.get<any[]>(url, httpOptions);
  }
  odobriReklamu(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    const url = `${this.baseUrl}/Klijent/odobri-reklamu/${id}`;
    return this.http.put(url, httpOptions);
  }
}
