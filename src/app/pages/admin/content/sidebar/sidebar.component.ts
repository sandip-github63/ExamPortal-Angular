import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  activeButton: string = 'home'; // Default active button is 'home'


  constructor() { }

  ngOnInit(): void {
  }

  setActive(button: string): void {
     
    this.activeButton = button;
  }


}
