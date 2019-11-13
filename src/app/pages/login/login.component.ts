import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
// import { GoToDashboardService } from '../service/go-to-dashboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @Output() pageChanged = new EventEmitter<{server: boolean}>();
  // dashboard: boolean = true;
  constructor( private router: Router ) { }

  ngOnInit() {
    // this.dash.variable = this.dashboard;
  }

  gotoPage() {
    this.router.navigate(['/pages']);
    // this.pageChanged.emit({server: this.dashboard});
  }

}
