import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  login(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    return this.http.post(this.baseUrl + '/Login/PostLoginDetails', user, httpOptions)
  }
}
