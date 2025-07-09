import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public http: HttpClient) { }

  getUserChoices(): Observable<any> {
    return this.http.get(environment.apiUrl + "/user/choice");
  }
}
