import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
  
})
export class ViewCategoriesComponent implements OnInit {

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  categories:any[]|null=null;

  constructor(private category:CategoriesService) { }

  ngOnInit(): void {

    this.category.categories().subscribe(
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
}
