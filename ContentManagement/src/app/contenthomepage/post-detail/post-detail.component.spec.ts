import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailComponent } from './post-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj('PostService', ['getPostById', 'getCommentsForPost', 'addComment', 'deleteComment']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['getCurrentUser']);
  
    postServiceSpy.getPostById.and.returnValue(of({ id: '1', title: 'Test Post', content: 'Test Content' }));
    postServiceSpy.getCommentsForPost.and.returnValue(of([{ id: 1, content: 'Test Comment', author: 'User1' }]));
    postServiceSpy.addComment.and.returnValue(of({ id: 2, content: 'New Comment', author: 'User1' }));
    postServiceSpy.deleteComment.and.returnValue(of({}));
    userServiceSpy.getCurrentUser.and.returnValue('User1');
  
    await TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a comment', () => {
    const postId = '1';
    const mockComment = { id: 2, content: 'New Comment', author: 'User1' };
    
    postServiceSpy.addComment.and.returnValue(of(mockComment));
    userServiceSpy.getCurrentUser.and.returnValue('User1');

    component.newComment = 'New Comment';
    component.post = { id: postId };
    component.addComment();

    expect(postServiceSpy.addComment).toHaveBeenCalledWith(postId, jasmine.objectContaining({ content: 'New Comment', author: 'User1' }));
    expect(component.comments).toContain(mockComment);
    expect(component.newComment).toBe('');
  });

  it('should delete a comment', () => {
    const postId = '1';
    const commentId = 1;

    postServiceSpy.deleteComment.and.returnValue(of({}));
    postServiceSpy.getCommentsForPost.and.returnValue(of([])); 

    component.comments = [{ id: commentId, content: 'Comment to delete' }];
    component.post = { id: postId };
    component.deleteComment(commentId);

    expect(postServiceSpy.deleteComment).toHaveBeenCalledWith(commentId);
    expect(component.comments.length).toBe(0);
  });

});
