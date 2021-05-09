import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {}

  add(todo: any): Observable<any> {
    return this.http.post('...', todo);
  }

  getTodos(): Observable<any> {
    return this.http.get('...');
  }

  delete(id: string): Observable<any> {
    return this.http.delete('...');
  }

  getTodosPromise(): Promise<any> {
    return this.http.get('...').toPromise();
  }

}
