import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  // public sidebarOpened = false;
  // toggleOffcanvas() {
  //   this.sidebarOpened = !this.sidebarOpened;
  //   if (this.sidebarOpened) {
  //     document.querySelector('.sidebar-offcanvas').classList.add('active');
  //   }
  //   else {
  //     document.querySelector('.sidebar-offcanvas').classList.remove('active');
  //   }
  // }
  dropdownOpen: boolean = false;

  constructor(private router: Router, config: NgbDropdownConfig) {
    config.placement = 'left-bottom';
  }
  ngOnInit() {
  }

  dropdownClick() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.router.navigate(['pages/login']);
  }
}
  