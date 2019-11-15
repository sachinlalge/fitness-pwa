import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/service/excel-service/excel.service';
import { GetAllUsersService } from '../../service/get-all-users/get-all-users.service';
import { PassServiceService } from '../../service/pass-service/pass-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { msg } from '../../../messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss','../../app.component.scss'],
  providers: [ExcelService],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  userlist: any = [
    // { id: 1, name: 'Scarlett Johansson', gender: 'Female', age: '2019', weight: '67' },
    // { id: 3, name: 'Morena Baccarin ', gender: 'Female', age: '2018', weight: '98' },
    // { id: 9, name: 'Chris Hemsworth ', gender: 'Male', age: '2018', weight: '59' },
    // { id: 5, name: 'Sophie Turner', gender: 'Female', age: '2019', weight: '20' },
    // { id: 9, name: 'Don Cheadle ', gender: 'Male', age: '2018', weight: '59' },
    // { id: 6, name: 'Simone Missick ', gender: 'Female', age: '2018', weight: '45' },
    // { id: 7, name: ' Samuel L. Jackson ', gender: 'Male', age: '2019', weight: '73' },
    // { id: 8, name: 'Robert Downey Jr. ', gender: 'Male', age: '2019', weight: '82' },
    // { id: 9, name: 'Paul Bettany ', gender: 'Male', age: '2018', weight: '59' },
    // { id: 4, name: 'Emma Stone ', gender: 'Female', age: '2019', weight: '90' },
    // { id: 9, name: 'Chris Evans ', gender: 'Male', age: '2018', weight: '59' },
    // { id: 2, name: 'Elizabeth Olsen ', gender: 'Female', age: '2018', weight: '43' },
    // { id: 9, name: 'Jon Favreau ', gender: 'Male', age: '2018', weight: '59' },
  ];
  p: number = 1;
  arrow = false;
  isDesc: any = [];
  column: any = [];
  search:any={};
  dataObjforExcel: any = [];
  dataArrayforExcel: any = [];

  constructor(
    private router: Router, 
    private excelService: ExcelService, 
    private getUsersServ: GetAllUsersService,
    private passServ: PassServiceService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    // this.search = {
    //   id: '',
    //   name: '',
    //   gender: '',
    //   age: '', 
    //   weight: '',  
    // };
  }

  ngOnInit() {
    this.spinner.show();
    this.getUsers();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 1000);
  }


  // sort 
  sort(property) {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    const direction = this.isDesc ? 1 : -1;

    this.userlist.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }

  
  exportExcel() {
    this.dataArrayforExcel = [];
    for (let i = 0; i < this.userlist.length; i++) {
      this.dataObjforExcel = {
        // 'ID': this.userlist[i].id,
        'NAME': this.userlist[i].name,
        'GENDER': this.userlist[i].gender,
        'AGE': this.userlist[i].age,
        'WEIGHT': this.userlist[i].weight,
      }
      console.log('this.dataArray',this.dataObjforExcel)
      this.dataArrayforExcel.push(this.dataObjforExcel);
    }
    this.exportAsXLSX();
  }
  
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.dataArrayforExcel, 'Details');
  }
  
  // gotoPage(path) {
  //   this.router.navigate(path);
  // }

  gotestPage(item) {
    this.passServ.testUser = item;
    this.router.navigate(['pages/test']);
    // console.log('pass item',item)
  }
  goworkPage(item) {
    this.passServ.workoutUser = item;
    this.router.navigate(['pages/workout']);
  }


  // get users
  getUsers() {
    this.getUsersServ.getUsers().then(res => {
        // console.log('res', res);
      this.spinner.hide();
      try {
        if (res.type === true) {
          // console.log('res', res);
          try {
          this.userlist = res.data;
          // console.log('this.userlist',this.userlist);
          // this.setveractive = false;
          } catch (e) {
            console.log(e);
          }
        }
        if (res.type === false) {
          this.spinner.hide();
          console.log('res', res);
          // if(this.featureList.length === 0){
          //   this.featureLength = false;
          // } else if(this.featureList.length > 0){
          //   this.featureLength = true;
          // }
        }
      } catch (e) {
        console.log(e);
      }
    },
    err => {
      console.log(err);
      this.spinner.hide();
      // this.setveractive = true;
      // this.featureList = [];
      this.toastr.error(msg.severerror);
    });
  }


}