import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
