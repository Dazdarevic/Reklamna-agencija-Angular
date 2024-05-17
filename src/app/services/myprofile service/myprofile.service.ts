import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyprofileService {

  public baseUrl = environment.baseUrl + '/Korisnik';

  constructor(private http: HttpClient) { }


  getUserByIdAndRole(userId: number, role: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password),
      })
    };

    console.log("token ", localStorage.getItem('token'));
    const url = `${this.baseUrl}/mojprofil?id=${userId}&role=${role}`;
    return this.http.get<any>(url, httpOptions);
  }
}
