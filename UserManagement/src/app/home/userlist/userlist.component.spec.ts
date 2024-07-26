import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserlistComponent } from './userlist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('UserlistComponent', () => {
  let component: UserlistComponent;
  let fixture: ComponentFixture<UserlistComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  
    await TestBed.configureTestingModule({
      declarations: [UserlistComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(UserlistComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on ngOnInit', fakeAsync(() => {
    const mockUsers = [{ username: 'karthick' }];
    userService.getUsers.and.returnValue(of(mockUsers));
    
    fixture.detectChanges();
    tick(); 
  
    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
  }));

  it('should navigate to posts on Gotopost', () => {
    component.Gotopost();
    expect(router.navigate).toHaveBeenCalledWith(['/ContentManagement/posts']);
  });
});
