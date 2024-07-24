import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:3000/posts'; 
  private commentsUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPostById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createPost(post: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

   addComment(postId: string, comment: any): Observable<any> {
    comment.postId = postId;
    comment.id = this.generateId();
    return this.http.post<any>(this.commentsUrl, comment);
  }

  getCommentsForPost(postId: string): Observable<any> {
    return this.http.get<any[]>(`${this.commentsUrl}?postId=${postId}`);
  }

  deleteComment(id: number): Observable<any> {
    console.log('Deleting comment ID:', id); // Debugging
    return this.http.delete<any>(`${this.commentsUrl}/${id}`);
  }

  private generateId(): number {
    return Math.floor(Math.random() * 10000);
  }
}
