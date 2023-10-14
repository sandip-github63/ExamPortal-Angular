import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  //activeButton: string = 'home'; // Default active button is 'home'

  activeButton: string = ''; 

  categories:any;


  constructor(private _cat:CategoriesService,private _snack:MatSnackBar) { }

  ngOnInit(): void {

      this._cat.categories().subscribe(
       (data:any)=>{
          this.categories=data;
         
       },

       (error)=>{

        this._snack.open("Something went wrong in server..",'categories fetch',{
            duration:3000
        });
        console.log("Error !! :"+error);  
         
       }

      );
      
  }

  setActive(button: string): void {
     
    //this.activeButton = button;
  }



}
