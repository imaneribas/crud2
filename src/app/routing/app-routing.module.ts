import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdduserComponent } from '../userComponent/adduser/adduser.component';
import { UsersmanageComponent } from '../userComponent/usersmanage/usersmanage.component';

import { UpdateUserComponent } from '../userComponent/update-user/update-user.component';
import { LoginComponent } from '../login/login.component';







const routes: Routes = [

  {path:'update/:id',component:UpdateUserComponent},
  {path:'',component:UsersmanageComponent},
  {path:'login',component:LoginComponent},

 

  {path:'users/CreateUser',component:AdduserComponent},
 

  { path: '**', redirectTo: 'not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
