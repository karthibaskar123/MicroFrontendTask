import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule ,HttpTestingController} from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[UserService]
    });
    service = TestBed.inject(UserService);  
    httpMock = TestBed.inject(HttpTestingController); 
    
  });

  afterEach(()=>{httpMock.verify()});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user',() => {
    const mockResponce = {success:true};
    const username = 'karthick';
    const password = 'Karthi@123';
    service.register(username,password).subscribe(response=>{
      expect(response).toEqual(mockResponce);
    });
    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({username,password});
    req.flush(mockResponce);
  });

  it('should return userlist',()=>{
    const mockUsers = [
      {id:1,username:'karthick'},
      {id:2,username:'baskar'}
    ];
    service.getUsers().subscribe(response =>{
      expect(response.length).toBe(2);
      expect(response).toEqual(mockUsers);
    });
    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  })
  it('should check if the user is already exist',()=>{
    const mockUsers = [
      {id:1,username:'karthick'}
    ]
    const username = 'karthick';
    service.checkUserExists(username).subscribe(responce=>{
      expect(responce).toBeTrue();
    });
    const req = httpMock.expectOne(`${service['baseUrl']}?username=${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  })
  
});
