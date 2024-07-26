import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true for valid user login', () => {
    const dummyUsers = [{ username: 'testUser' }];
    service.login('testUser').subscribe(loggedIn => {
      expect(loggedIn).toBeTrue();
      expect(service.getCurrentUser()).toBe('testUser');
    });

    const req = httpMock.expectOne(`${service['baseUrl']}?username=testUser`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should return false for invalid user login', () => {
    service.login('invalidUser').subscribe(loggedIn => {
      expect(loggedIn).toBeFalse();
      expect(service.getCurrentUser()).toBeNull();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}?username=invalidUser`);
    expect(req.request.method).toBe('GET');
    req.flush([]);  // Empty array represents no users found
  });

  it('should logout the current user', () => {
    service.login('testUser').subscribe(() => {
      service.logout();
      expect(service.getCurrentUser()).toBeNull();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}?username=testUser`);
    req.flush([{ username: 'testUser' }]);
  });

  it('should get the current user', () => {
    const dummyUsers = [{ username: 'testUser' }];
    service.login('testUser').subscribe(() => {
      expect(service.getCurrentUser()).toBe('testUser');
    });

    const req = httpMock.expectOne(`${service['baseUrl']}?username=testUser`);
    req.flush(dummyUsers);
  });
});
