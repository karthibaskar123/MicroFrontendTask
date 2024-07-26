import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService : jasmine.SpyObj<UserService>;
  let router : jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceSpy =jasmine.createSpyObj('UserService',['checkUserExists','register'])
    const routerSpy =jasmine.createSpyObj('Router',['navigate']);
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule,HttpClientTestingModule],
      providers:[
        {provide:UserService,useValue:userServiceSpy},
        {provide:Router,useValue:routerSpy}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should call userservice.checkUserExists',()=>{
      userService.checkUserExists.and.returnValue(of(true)); 
      spyOn(window,'alert');

      component.registrationForm.setValue({username:'karthick',password:'Karthi@123'});
      component.register();
      expect(userService.checkUserExists).toHaveBeenCalledWith('karthick');
      expect(window.alert).toHaveBeenCalledWith('User is already registered!');
      expect(router.navigate).toHaveBeenCalledWith(['/ContentManagement/login']);
    });

    it('should register user and navigate to login',()=>{
      userService.checkUserExists.and.returnValue(of(false));
      userService.register.and.returnValue(of({}));
      spyOn(window,'alert');
      component.registrationForm.setValue({username:'karthick',password:'Karthi@123'});
      component.register();
      expect(userService.checkUserExists).toHaveBeenCalledWith('karthick');
      expect(userService.register).toHaveBeenCalledWith('karthick','Karthi@123');
      expect(window.alert).toHaveBeenCalledWith('Registration successful!');
      expect(router.navigate).toHaveBeenCalledWith(['/ContentManagement/login']);
      expect(component.registrationForm.value).toEqual({username:'',password:''});
      });
    it('should handle registration failure',()=>{
      userService.checkUserExists.and.returnValue(of(false));
      userService.register.and.returnValue(throwError(()=> new Error('Registration failed!')));
      spyOn(window,'alert');
      component.registrationForm.setValue({username:'karthick',password:'Karthi@123'});
      component.register();
      expect(userService.checkUserExists).toHaveBeenCalledWith('karthick');
      expect(userService.register).toHaveBeenCalledWith('karthick','Karthi@123');
      expect(window.alert).toHaveBeenCalledWith('Registration failed!')
    })
});
