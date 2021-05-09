import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serviceUrl = 'http://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  private getUserUrl(userId: string): string {
    return this.serviceUrl + '/' + userId;
  }

  getUsers(): Observable<any> {
    return this.http.get(this.serviceUrl);
  }

  getUser(userId): Observable<any> {
    return this.http.get(this.getUserUrl(userId));
  }

  addUser(user): Observable<any> {
    return this.http.post(this.serviceUrl, JSON.stringify(user));
  }

  updateUser(user): Observable<any> {
    return this.http.put(this.getUserUrl(user.id), JSON.stringify(user));
  }

  deleteUser(userId): Observable<any> {
    return this.http.delete(this.getUserUrl(userId));
  }
}
