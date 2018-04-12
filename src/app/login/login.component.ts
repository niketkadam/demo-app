
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { pinValidator,userIdValidator } from '../login/validators';

// import { UserDataService } from '../../data.services/user.dataservice';

import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  UserId:string='';
  userPin: string = '';
  msgError: boolean = false;
  msg: string = '';
  constructor(private fb: FormBuilder,private router: Router) {
    this.userForm = fb.group({
      userId: ['', Validators.compose([Validators.required,Validators.pattern("[a-zA-Z0-9_]*")])],
      userPin:['',Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(6),pinValidator])],
      })
   }

  ngOnInit() {
  }

  submitForm(value) {
    this.router.navigate(['management']);
  }

}
