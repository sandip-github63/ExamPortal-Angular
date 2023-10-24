import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css']
})
export class ViewAllUsersComponent implements OnInit {

  public users: any; 

  showManageUserList: boolean = false;

  public filteredUsers: any; 

  //pagination 

  pageSize:any=2;

  currentPage = 0;

  pageSizeOp=[1, 2, 3, 10];


  constructor(private _user: UserService) {}


  @ViewChild(MatPaginator) paginator: MatPaginator| any;

  ngOnInit(): void {
    this._user.getAllUsers().subscribe(
      (data: any) => {
        this.users = data;

        this.filteredUsers=this.users;

        for (let u of this.users) {
          if (u.enable) {
            u.enable = "Active";
          } else {
            u.enable = "De-Active";
          }
        }
      },
      (error: any) => {
        console.log("Error during fetching List of Users: " + error);
      }
    );

    
  }

  public deleteUserById(userId: any) {
    Swal.fire({
      title: 'Are you sure want to delete ?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this._user.deleteUser(userId).subscribe(
          (data: any) => {
            // Handle success response
            this.users=this.users.filter((user:any)=>user.userId!=userId);

          },
          (error) => {
            console.log("Error while deleting the user: " + error);
          }
        );
      } else if (result.isDenied) {
        Swal.fire('User is saved...', '', 'info');
      }
    });
  }


  public filterUsers(searchValue: string) {
     
    if (!searchValue) {
      // If the search input is empty, show all users
      this.filteredUsers = this.users;
    } else {
      // Filter the users based on the search input
      this.filteredUsers = this.users.filter((user: any) => {
        // You can customize the search logic based on your requirements
        return (
          user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
    }
  }


  // Add a function to handle page change
  onPageChange(event:any) {

    this.pageSize = event.pageSize; 

    this.currentPage = event.pageIndex;

    this.paginator.pageIndex = this.currentPage;

  
  }

  get pagedUsers() {
    
    const startIndex = this.currentPage * this.pageSize;

    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

}
