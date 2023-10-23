import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent implements OnInit {

  userId:any;

  firstName:any;

  updateRoleData:any={
     "userRoleId":0,
     "userId":0,
     "roleName":""
  };

  role:any=[
      {
        "userRoleId":0 ,
        "role":{
            "roleId": 0 ,
            "roleName":"",


        },
        "user":{
            "userId":0
        }
      }
  ];

  public changeRoleValue: boolean = false;

  currentRole:any="Normal User";

  changeRoleText:any="Admin";



  constructor(private _route:ActivatedRoute,private _role:RoleService) { }

  ngOnInit(): void {
    this.userId=this._route.snapshot.params.userId;
    this.firstName=this._route.snapshot.params.firstName;


    this._role.getRoleOfUser(this.userId).subscribe(
       (data:any)=>{

         this.role=data;

         this.updateRoleData.roleName=this.role[0].role.roleName;         

         if(this.role[0].role.roleName!="ROLE_USER"){

            this.currentRole="Admin User";

            this.changeRoleText="User"

            
         }
        
          
       },
       (error:any)=>{

        
        console.log("error!!! :"+error);
         
       }
    );
    
  }

  public updateRole(){

     if(this.changeRoleValue){

      this.updateRoleData.userRoleId=this.role[0].userRoleId;
      this.updateRoleData.userId=this.userId;
      if(this.role[0].role.roleName=="ROLE_ADMIN"){
        this.updateRoleData.roleName="ROLE_USER";
      }else if(this.role[0].role.roleName=="ROLE_USER"){

        this.updateRoleData.roleName="ROLE_ADMIN";

      }      

      this._role.updateRoleOfUser(this.updateRoleData).subscribe(
         (data:any)=>{

          alert("role is updated....");

         },

         (error:any)=>{
            alert("error");
            console.log("error"+error);
         }
      );
    
     }

  }


}
