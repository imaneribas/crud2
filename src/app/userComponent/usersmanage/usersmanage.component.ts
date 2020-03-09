import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {  MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UserModel } from 'src/app/Model/user.model';
import { UserService } from 'src/app/common/services/user.service';
import { ConfirmDialogModel, DeleteuserpopupComponent } from '../deleteuserpopup/deleteuserpopup.component';


import { ActivatedRoute, Router } from '@angular/router';
import { AdduserComponent } from '../adduser/adduser.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-usersmanage',
  templateUrl: './usersmanage.component.html',
  styleUrls: ['./usersmanage.component.css']
})

export class UsersmanageComponent implements OnInit {
  result: string = '';
  users: UserModel[];
  dataSource:MatTableDataSource<UserModel>;
  isPopupOpen=true;
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'email', 'phoneNumber','isEnabled','emailConfirmed','Action'];
searchText;
  //userSubscription: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService,public matdialog:MatDialog,private route :Router,private activateroute: ActivatedRoute,private toast:ToastrService) { }

  async ngOnInit() {

 // this.users=await this.userService.GetAllUsers().toPromise();
    this.users=this.userService.usermodel;
    console.log(this.users);
    this.dataSource = new MatTableDataSource<UserModel>(this.users);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
  }

  disabledUser(id){
    console.log("zzzzzzzzzz",id)
    this.userService.disabledUser(id).subscribe(()=>{
     //this.userService.GetAllUsers();
     this.users=this.userService.usermodel;

   });

  }
  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matdialog.open(AdduserComponent, dialogConfig);
  }

applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


//  ngOnDestroy() {
//    this.userSubscription.unsubscribe();
//    }
//   delete(id){
//     const message="voulez vous supprimer ce user";
//     const DialogBoite=new ConfirmDialogModel("Confirmation", message);
//     const dialogRef = this.matdialog.open(DeleteuserpopupComponent
//       , {
//       maxWidth: "400px",
//       data: DialogBoite
//     });
//     dialogRef.afterClosed().subscribe(dialogResult => {
//       this.result = dialogResult;
//       if(this.result){
//     this.userService.deleteuser(id);

//   }
//  });


deleteUser(id){
      const message="voulez vous supprimer ce user";
      const DialogBoite=new ConfirmDialogModel("Confirmation", message);
      const dialogRef = this.matdialog.open(DeleteuserpopupComponent
        , {
        maxWidth: "400px",
        data: DialogBoite
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        this.result = dialogResult;
    if(this.result){
      //alert("delete");
    this.users = this.users.filter(h => h !== id);
    this.userService.deleteUser(id).subscribe(()=>{
      this.userService.GetAllUsers();
      this.toast.success("the user has been deleted",'success', {
        timeOut: 2000,
        positionClass: 'toast-top-right'
      }); 
    }
    ,err=>{
      this.toast.warning("a problem has been occured",'error', {
        timeOut: 2000,
        positionClass: 'toast-top-right'
      });
    }


    );
    }
                                         });

           }
// updateUser(id:number){
//   this.route.navigate[('update/:id')]
//   this.isPopupOpen=true;
//   const idUserToUpdate = +this.activateroute.snapshot.paramMap.get('id');
//   //const contact=this.userService.getUserById(id);
// const dialogRef=this.matdialog.open(UpdateuserComponent,{
//   data:{}
// });

//   dialogRef.afterClosed().subscribe(x => {
//     this.isPopupOpen = false;
//   });
// }











        }
