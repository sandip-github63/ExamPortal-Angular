import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activeButton: string = 'home'; // Default active button is 'home'

  constructor() { }

  ngOnInit(): void {
  }


  setActive(button: string): void {
    this.activeButton = button;
  }

  
}
