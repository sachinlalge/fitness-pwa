import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'New Admin';
  // template: string =`<img src="http://pa1.narvii.com/5722/2c617cd9674417d272084884b61e4bb7dd5f0b15_hq.gif" />`

  redirectToDash(data: {server: boolean}) {
    console.log(data.server);
    // this.dashboard = data.server;
    // console.log(this.dashboard);
    // this.dashboard = !this.dashboard;
  }
}
