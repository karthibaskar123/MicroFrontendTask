import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CreatePostComponent } from './create-post.component';
import { PostService } from '../../service/post.service';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['createPost']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CreatePostComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: PostService, useValue: postServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.postForm.get('title')?.value).toBe('');
    expect(component.postForm.get('content')?.value).toBe('');
  });

  it('should make form invalid if required fields are empty', () => {
    component.postForm.get('title')?.setValue('');
    component.postForm.get('content')?.setValue('');
    expect(component.postForm.valid).toBeFalsy();
  });

  it('should make form valid if required fields are filled', () => {
    component.postForm.get('title')?.setValue('Test Title');
    component.postForm.get('content')?.setValue('Test Content');
    expect(component.postForm.valid).toBeTruthy();
  });

  it('should call createPost on PostService and navigate on success', () => {
    const post = { title: 'Test Title', content: 'Test Content', author: 'currentUser' };
    postService.createPost.and.returnValue(of({}));
    component.postForm.setValue({ title: 'Test Title', content: 'Test Content' });
    component.createPost();
    expect(postService.createPost).toHaveBeenCalledWith(post);
    expect(router.navigate).toHaveBeenCalledWith(['/ContentManagement/posts']);
  });
  it('should navigate back to posts list when GoBack is called', () => {
    component.GoBack();
    expect(router.navigate).toHaveBeenCalledWith(['/ContentManagement/posts']);
  });
});
