import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/common/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/Model/user.model';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  public _contactForm: FormGroup;
  user:UserModel;


  constructor(private userService: UserService,private route:ActivatedRoute,private location:Location,private toast:ToastrService) { }

  async ngOnInit(): Promise<void> {
   const id = this.route.snapshot.paramMap.get('id');
    //this.user=await this.userService.getUserById(id).toPromise();
this.user=this.userService.usermodel[id];

  }
  async save() {
    this.userService.updateUser(this.user).subscribe(
      succes=>{
      this.goBack() ;
      this.toast.success("user has been update",'success', {
        timeOut: 2000,
        positionClass: 'toast-top-right'
      });
    },err=>{

      this.toast.warning("a problem has been occured",'error', {
        timeOut: 2000,
        positionClass: 'toast-top-right'
      });
      }
      
      );
    //console.log("update success");
  }






  goBack(){
    this.location.back();
  }
  onNoClick(): void {
    console.log("test succes on no click");
   }
}
