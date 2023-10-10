import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category={
    title: '',
    discription:''
    
    
  };



  constructor(private cat:CategoriesService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

   
  }

  
  onSubmit() {
   
    if(this.category.title.trim()=="" || this.category.title==null){

    this._snackBar.open("title is required !!","",{
      duration:3000
    })
    return ;
  }

  this.cat.addCategory(this.category).subscribe(
      (data:any)=>{

         this.category.title="";
         this.category.discription="";
         
         Swal.fire("Success!!", "Category added successfully","success");

      },
      (error:any)=>{
        console.log("error !!!!!!! "+error);

        Swal.fire("Error!!", "Internal Server error ","error");

      }
  )


  }

}
