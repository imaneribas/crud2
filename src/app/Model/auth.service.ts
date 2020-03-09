import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  installStorage(rem:boolean,email:string){
       const day=new Date();
       if(rem){
         day.setDate(day.getDate()+10);
       }else{
         day.setMinutes(day.getMinutes()+1);
       }
      
 }
}
