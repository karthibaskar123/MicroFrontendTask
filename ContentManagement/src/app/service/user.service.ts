import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/users';
  private currentUser: string | null = null;

  constructor(private http: HttpClient) { }

  login(username: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.baseUrl}?username=${username}`).pipe(
      map(users => {
        if (users.length > 0) {
          this.currentUser = users[0].username;
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }
}
