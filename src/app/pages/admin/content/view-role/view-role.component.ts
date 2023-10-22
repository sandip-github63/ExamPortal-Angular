import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent implements OnInit {

  userId:any;

  constructor(private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.userId=this._route.snapshot.params.userId;

    
    
  }

  

}
