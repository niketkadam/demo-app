import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

 // fdescribe  if we want to run particular describe then just use fdescribe  
describe('Welcome component tests', () => {
    let comp: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {

        class RouterStub {
            navigate(url: string) { return url; }
        }

        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [FormsModule, ReactiveFormsModule],
            providers: [
                { provide: Router, useClass: RouterStub }
            ]
        })
            .compileComponents()
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('userId field validity', () => {
        let errors = {};
        let userId = comp.userForm.controls['userId'];
        expect(comp.userForm.valid).toBeFalsy();
        
        errors = userId.errors || {};
        expect(errors['required']).toBeTruthy();
        
        userId.setValue("test");
        console.log(userId.errors);
        expect(userId.errors).toBeFalsy();
    });

    it('userPin field validity', () => {
        let errors = {};
        let userPin = comp.userForm.controls['userPin'];

        errors = userPin.errors || {};
        expect(errors['required']).toBeTruthy();

        userPin.setValue("123456");
        console.log(userPin.errors);
        expect(userPin.errors).toBeFalsy();
    });

    it('Should log in and navigate to management', inject([Router], (router: Router) => {
        const spy = spyOn(router, 'navigate');
        comp.submitForm();
        const navArgs = spy.calls.first().args[0];
        console.log(spy.calls.first().args[0]);
        expect(navArgs[0]).toBe('management');
    }));
});