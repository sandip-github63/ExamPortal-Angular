import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  cId: any;

  category:any = {
    cId:null,
    title: '',
    discription: ''
  };

  constructor(
    private router: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cat: CategoriesService
  ) { }

  ngOnInit(): void {
    this.cId = this.router.snapshot.params.cId;

    this.cat.getCategory(this.cId).subscribe(
       (data)=>{
          this.category=data;
       },
       (error)=>{
           console.log(error);
       }
    );

  }

  onSubmit() {
    if (this.category.title.trim() === '' || this.category.title == null) {
      this.snackBar.open('Title is required !!', '', {
        duration: 3000
      });
      return;
    }

    this.cat.addCategory(this.category).subscribe(
      (data: any) => {
        this.category.title = '';
        this.category.discription = '';
        Swal.fire('Success!!', 'Category Updated successfully', 'success');
      },
      (error: any) => {
        console.log('Error: ' + error);
        Swal.fire('Error!!', 'Internal Server error', 'error');
      }
    );
  }
}
