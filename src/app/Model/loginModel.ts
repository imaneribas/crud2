export class LoginModel{
  public password:string;
  public email:string;
  rememberMe:false;
  constructor(password?:string,email?:string,rememberMe?:false){
this.password=password;
this.email=email;
this.rememberMe=rememberMe;
  }
}
