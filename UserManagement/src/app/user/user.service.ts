import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { username, password });
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  checkUserExists(username: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.baseUrl}?username=${username}`).pipe(
      map(users => users.length > 0)
    );
  }
}
