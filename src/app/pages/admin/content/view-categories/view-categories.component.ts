import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
  
})
export class ViewCategoriesComponent implements OnInit {

  

  categories:any[]=[];

  //pagination 

  pageSize:any=2;

  currentPage = 0;

  pageSizeOp=[1, 2, 3, 10];

  @ViewChild(MatPaginator) paginator: MatPaginator| any;

  constructor(private _category:CategoriesService) { }

  ngOnInit(): void {

    this._category.categories().subscribe(
      (data:any)=>{

         //success

         this.categories=data;
         console.log(this.categories);

     },
     (error)=>{
          //
          console.log("error");
          Swal.fire('Error!!', 'Error loading data ','error');

     }
     
     )


  }


  public deleteCategoryById(cId:any){

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
        this._category.deleteCategoryByCid(cId).subscribe(
           (data:any)=>{

             
            this.categories=this.categories.filter((category:any)=>category.cId!=cId);

            Swal.fire('Deleted....','','success');
           },
           (error:any)=>{
               console.log("something went wrong.........");
           }
        );
       
      } 
    })   
  }

  // Add a function to handle page change
  onPageChange(event:any) {

    this.pageSize = event.pageSize; 

    this.currentPage = event.pageIndex;

    this.paginator.pageIndex = this.currentPage;

  
  }

  get pagedUsers() {
    
    const startIndex = this.currentPage * this.pageSize;

    return this.categories.slice(startIndex, startIndex + this.pageSize);
  }

}
