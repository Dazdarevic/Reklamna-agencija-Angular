import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {

  private baseUrl = environment.baseUrl + '/Slika';

  constructor(private http: HttpClient) { }

  sendPhoto(file: File): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Basic ' + btoa(environment.username + ':' + environment.password)
      })
    };
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.baseUrl, formData);
  }

}
