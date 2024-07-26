import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve posts from the API via GET', () => {
    const dummyPosts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });
    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('should retrieve a post by ID from the API via GET', () => {
    const dummyPost = { id: 1, title: 'Post 1' };
    service.getPostById('1').subscribe(post => {
      expect(post).toEqual(dummyPost);
    });
    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPost);
  });

  it('should create a new post via POST', () => {
    const newPost = { title: 'New Post' };
    service.createPost(newPost).subscribe(post => {
      expect(post.title).toBe(newPost.title);
    });
    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(newPost);
  });

  it('should delete a post by ID via DELETE', () => {
    service.deletePost(1).subscribe(response => {
      expect(response).toBeNull();
    });
    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should add a comment to a post via POST', () => {
    const newComment = { content: 'Nice post!' };
    service.addComment('1', newComment).subscribe(comment => {
      expect(comment.content).toBe(newComment.content);
    });
    const req = httpMock.expectOne(service['commentsUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(newComment);
  });

  it('should retrieve comments for a post by postId via GET', () => {
    const dummyComments = [{ id: 1, content: 'Great post!' }, { id: 2, content: 'Thanks for sharing!' }];
    service.getCommentsForPost('1').subscribe(comments => {
      expect(comments.length).toBe(2);
      expect(comments).toEqual(dummyComments);
    });
    const req = httpMock.expectOne(`${service['commentsUrl']}?postId=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyComments);
  });

  it('should delete a comment by ID via DELETE', () => {
    service.deleteComment(1).subscribe(response => {
      expect(response).toBeNull();
    });
    const req = httpMock.expectOne(`${service['commentsUrl']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
