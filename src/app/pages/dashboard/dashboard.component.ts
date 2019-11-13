import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/service/excel-service/excel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss','../../app.component.scss'],
  providers: [ExcelService],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  userlist: any = [
    { id: 1, name: 'Scarlett Johansson', gender: 'Female', age: '2019', weight: '67' },
    { id: 3, name: 'Morena Baccarin ', gender: 'Female', age: '2018', weight: '98' },
    { id: 9, name: 'Chris Hemsworth ', gender: 'Male', age: '2018', weight: '59' },
    { id: 5, name: 'Sophie Turner', gender: 'Female', age: '2019', weight: '20' },
    { id: 9, name: 'Don Cheadle ', gender: 'Male', age: '2018', weight: '59' },
    { id: 6, name: 'Simone Missick ', gender: 'Female', age: '2018', weight: '45' },
    { id: 7, name: ' Samuel L. Jackson ', gender: 'Male', age: '2019', weight: '73' },
    { id: 8, name: 'Robert Downey Jr. ', gender: 'Male', age: '2019', weight: '82' },
    { id: 9, name: 'Paul Bettany ', gender: 'Male', age: '2018', weight: '59' },
    { id: 4, name: 'Emma Stone ', gender: 'Female', age: '2019', weight: '90' },
    { id: 9, name: 'Chris Evans ', gender: 'Male', age: '2018', weight: '59' },
    { id: 2, name: 'Elizabeth Olsen ', gender: 'Female', age: '2018', weight: '43' },
    { id: 9, name: 'Jon Favreau ', gender: 'Male', age: '2018', weight: '59' },
  ];
  p: number = 1;
  arrow = false;
  isDesc: any = [];
  column: any = [];
  search:any={};
  dataObjforExcel: any = [];
  dataArrayforExcel: any = [];

  constructor(private router: Router, private excelService: ExcelService) {
    // this.search = {
    //   id: '',
    //   name: '',
    //   gender: '',
    //   age: '', 
    //   weight: '',  
    // };
  }

  ngOnInit() {
  }

  // clear button
  // clearBtn() {
  //   this.search.id = '';
  //   this.search.name = '';
  //   this.search.gender = '';
  //   this.search.age = '';
  //   this.search.weight = '';
  // }

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

  gotoPage(path) {
    this.router.navigate(path);
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
}