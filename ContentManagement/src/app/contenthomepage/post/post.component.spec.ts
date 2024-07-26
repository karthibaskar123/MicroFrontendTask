import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { PostService } from '../../service/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let router: Router;

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPosts']);
    
    await TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: PostService, useValue: postServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch posts on init', () => {
    const mockPosts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
    postService.getPosts.and.returnValue(of(mockPosts)); 
    component.ngOnInit(); 
    expect(component.posts).toEqual(mockPosts);
    expect(postService.getPosts).toHaveBeenCalled();
  });

  it('should navigate to user list on Gotopost', () => {
    spyOn(router, 'navigate');
    component.Gotopost();
    expect(router.navigate).toHaveBeenCalledWith(['/UserManagement/userlist']);
  });
});
