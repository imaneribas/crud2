import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from 'src/app/common/services/user.service';
import { UserModel } from 'src/app/Model/user.model';
import { registerModel } from 'src/app/Model/registerModel';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  userForm: FormGroup;
  users:UserModel[]=[];
  messageValidate={
    userName:{
      required:'enter userName', 
      matchuserName:'',
    },
    email:{
      required:'email required',
      notValid:'email non valide',
      matchEmail:''
    }
  };
  constructor(private formBuilder: FormBuilder,private router: Router,private userservice:UserService,public dialogRef: MatDialogRef<AdduserComponent>,private toast:ToastrService) {
    //this.users=userservice.usermodel;
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.userForm = this.formBuilder.group({

      userName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],

    });
}
  async onSubmitForm() {
    if(this.userForm.valid){
  const formValue = this.userForm.value;
  const newUser = new registerModel(
    formValue['userName'],
    formValue['email']
  );
this.userservice.CreateUser(newUser).subscribe(
  succes=>{
   this.userForm.reset();
   this.userForm.value.userName='';
   this.userForm.value.email='';
   this.toast.success("new user has been add",'success', {
    timeOut: 2000,
    positionClass: 'toast-top-right'
  });
  },err=>{
    console.log(err),
    this.userForm.reset();
    this.toast.warning("a problem has been occured",'error', {
      timeOut: 2000,
      positionClass: 'toast-top-right'
    });
  }
);}

  this.router.navigate(['/users']);
}
allUsers(){
  this.userservice.GetAllUsers().subscribe(list=>
    {this.users=list;
      
    },err=>console.log(err.error));
}

isUserNameExist(){
  for(const name of this.users){
    const username=this.userForm.value.userName;
    if(name.userName===username){
    this.messageValidate.userName.matchuserName='userName already used';
    return true;
    }
  }
  return false;
}
isEmailExist(){
  for(const email of this.users){
    const mail=this.userForm.value.email;

    if(email.email===mail){
    this.messageValidate.email.matchEmail='mail already used';
    return true;
    }
  }

return false;
}
closeModal() {
  this.userForm.reset();
  this.dialogRef.close();

  
}
}
