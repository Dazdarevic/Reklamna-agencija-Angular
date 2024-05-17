import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getFaktureZaAdmina(id: number): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    const url = `${this.baseUrl}/Fakture/fakture-za-admina//${id}`;
    return this.http.get<any[]>(url, httpOptions);
  }

  provjeriReklamuNaPanelu(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/AdminAgencije/${id}/ima-reklamu`);
  }

  getGradovi(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password),
      })
    };
    return this.http.get<any[]>(this.baseUrl + "/AdminAgencije/gradovi", httpOptions);
  }

  getAllInactiveKorisnici(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password),
      })
    };
    return this.http.get<any[]>(this.baseUrl + "/Korisnik/neodobreni-korisnici", httpOptions);
  }

  // deleteKorisnik(id: number, email: string): Observable<any> {
  //   return this.http.delete<any>(`${this.baseUrl}/Korisnik/${id}?email=${email}`);
  // }

  // odobriRegistraciju(id: number): Observable<any> {
  //   return this.http.put<any>(`${this.baseUrl} + "/Korisnik/${id}`);
  // }

  // odobriRegistraciju(id: number, email: string): Observable<any> {
  //   const url = `${this.baseUrl}/Korisnik/odobrena-registracija/${id}?email=${email}`;
  //   return this.http.put<any>(url, null);
  // }
  odobriRegistraciju(id: number, email: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    return this.http.put<any>(`${this.baseUrl}/Korisnik/odobrena-registracija?id=${id}&email=${email}`, httpOptions);
  }

  deleteKorisnik(id: number, email: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    return this.http.delete<any>(
      `${this.baseUrl}/Korisnik?id=${id}&email=${email}`, //
      httpOptions // Dodavanje httpOptions
    );
  }

  dodajReklamniPano(reklamniPano: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    return this.http.post<any>(this.baseUrl + "/AdminAgencije", reklamniPano, httpOptions);
  }

  getReklamniPanoi(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    return this.http.get<any[]>(this.baseUrl + "/AdminAgencije", httpOptions);
  }

  getReklamniPanoiBezReklame(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    return this.http.get<any[]>(this.baseUrl + "/AdminAgencije/ReklamniPanoiNotInReklame", httpOptions);
  }
  deleteReklamniPano(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    return this.http.delete(`${this.baseUrl}/AdminAgencije/${id}`, httpOptions);
  }

  getReklamniPanoAdmin(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    const url = `${this.baseUrl}/AdminAgencije/${id}`;
    return this.http.get<any>(url, httpOptions);
  }

  azurirajReklamniPano(id: number, reklamniPano: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    return this.http.put<any>(`${this.baseUrl}/AdminAgencije/azuriraj/${id}`, reklamniPano, httpOptions);
  }

  sendEmail(email: string, subject: string, message: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    const body = {
      email: email,
      subject: subject,
      message: message
    };
    return this.http.post<any>(`${this.baseUrl}/AdminAgencije/send-email`, body, httpOptions);
  }
}
