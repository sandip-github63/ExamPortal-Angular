import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  constructor(private login:LoginService) { }

  displayedColumns: string[] = ['column1', 'column2'];

  userName:String|null=null;
  
  dataSource = new MatTableDataSource<TableRow>([]);




  

  ngOnInit(): void {

    console.log("inside main component.......................!!!!!!!!!!!!!!!!!!!!!########");


    const userData = this.login.getUser();


    console.log("data is populated........................"+userData);

    //follow below format to generate userId

    // firstName first letter get 
    // lastNae first letter get
    // add "c11036"
    //add actual userId
    // SHC110361

    if (userData) {
      // Create an array with the user data you want to display
        console.log("inside if function.....");

      const firstName:string=userData.userWithAuthorities.user.firstName;
      const lastName:string=userData.userWithAuthorities.user.lastName;
      const userName:string=userData.userWithAuthorities.user.userName ;
      this.userName=userName;
      const phone:string=userData.userWithAuthorities.user.phone ;
      const email:string=userData.userWithAuthorities.user.email ;
      const userId=userData.userWithAuthorities.user.userId;
      let role:string=this.login.getUserRoleByUser(userData);      


      const formattedUserId = this.formatUserId(firstName,lastName,userId);
      console.log("standard......"+formattedUserId);





      const tableData: TableRow[] = [
        { column1: 'UserId', column2: formattedUserId},
        { column1: 'Phone', column2: phone},
        { column1: 'Role', column2:role},
        { column1: 'About', column2: email}
        //userWithAuthorities.user.userName  print authority
      ];

      // Update the MatTableDataSource with the retrieved data
      this.dataSource.data = tableData;
    }

  }


  public onDeleteClick(){

  }

  public onUpdateClick(){

  }


  //user ID formate standard follow
  private formatUserId(firstName: string, lastName: string, userId: number): string {
    // Get the first letter of firstName and lastName
    
   
    const firstLetterFirstName = firstName.charAt(0);
    console.log("fist letter ................"+firstLetterFirstName);

    const firstLetterLastName = lastName.charAt(0);

    console.log("fist letter ................"+firstLetterLastName);




    // Construct the userId using the specified format
    let formattedUserId = `${firstLetterFirstName}${firstLetterLastName}c11036${userId}`;

    

    // Convert the formattedUserId to uppercase
    formattedUserId = formattedUserId.toUpperCase();

    

    return formattedUserId;
  }

  

}

interface TableRow {
  column1: string;
  column2: string;
}
