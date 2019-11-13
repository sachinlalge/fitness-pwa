import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'New Admin';

  redirectToDash(data: {server: boolean}) {
    console.log(data.server);
    // this.dashboard = data.server;
    // console.log(this.dashboard);
    // this.dashboard = !this.dashboard;
  }
}
