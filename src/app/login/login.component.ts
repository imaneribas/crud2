import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../common/services/user.service';
import { registerModel } from '../Model/registerModel';
import { LoginModel } from '../Model/loginModel';
import { AuthService } from '../Model/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  messageValidate={
    email:{
      required:'email required',
      notvalid:'not accept aaa@bbb.cc'
    },
    password:{
      required:'password  required',
    }
  };

  constructor(private formBuilder: FormBuilder,private router: Router,private userservice:UserService,private auth:AuthService) {
    //this.users=userservice.usermodel;
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginForm = this.formBuilder.group({

      password: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      rememberMe:false
    });
}
  async login() {
    if(this.loginForm.valid){
        const formValue = this.loginForm.value;
        const newUser = new LoginModel(
        //this.userservice.usermodel.length.toString(),

          formValue['password'],
          formValue['email'],
          formValue['rememberMe']

        );
      this.userservice.Login(newUser).subscribe(
        succes=>{
          const rem=!!this.loginForm.value.rememberMe;
        this.loginForm.reset();
        const email=this.loginForm.value.userName;
        this.auth.installStorage(rem,email);
        },err=>console.log(err)

      );

        this.router.navigate(['/users']);
      }
    }
    
}
