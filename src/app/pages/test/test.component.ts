import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoToDashboardService } from 'src/app/service/go-to-dashboard.service';
import { ExcelService } from 'src/app/service/excel-service/excel.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss','../../app.component.scss'],
  providers: [ExcelService]
})
export class TestComponent implements OnInit {
  workList: any = [
    { id: 1, date: 'Nov 23, 2019', score: '32'},
    { id: 2, date: 'Dec 29, 2019', score: '65'},
    { id: 3, date: 'Jan 30, 2019', score: '75'},
    { id: 4, date: 'Feb 5, 2019', score: '43'},
    { id: 5, date: 'Mar 21, 2019', score: '86'},
    { id: 6, date: 'Apri 11, 2019', score: '234'},
    { id: 7, date: 'Jun 27, 2019', score: '56'},
    { id: 8, date: 'Nov 23, 2019', score: '32'},
    { id: 9, date: 'Dec 29, 2019', score: '65'},
    { id: 10, date: 'Jan 30, 2019', score: '75'},
    { id: 11, date: 'Feb 5, 2019', score: '43'},
    { id: 12, date: 'Mar 21, 2019', score: '86'},
    { id: 13, date: 'Apri 11, 2019', score: '234'},
    { id: 14, date: 'Jun 27, 2019', score: '56'},
  ];
  p: number = 1;
  arrow = false;
  isDesc: any = [];
  column: any = [];
  search:any={};
  dataObjforExcel: any = [];
  dataArrayforExcel: any = [];
  dropdownName: any;

  constructor(private router: Router,
    public dash: GoToDashboardService,
    private excelService: ExcelService) { 
      // this.search = {
      //   id: '',
      //   date: '',
      //   score: '',  
      // };
    }

  ngOnInit() {
    this.dropdownName = 'All';
  }

  filter(val) {
    this.dropdownName = val;
  }
  
  // clear button
  // clearBtn() {
  //   this.search.id = '';
  //   this.search.date = '';
  //   this.search.score = '';
  // }

  // sort 
  sort(property) {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    const direction = this.isDesc ? 1 : -1;

    this.workList.sort(function (a, b) {
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
    for (let i = 0; i < this.workList.length; i++) {
    //   if (this.posts[i].isActive === 1) {
    //     this.flag = 'Active';
    //   }
    //   if (this.posts[i].isActive === 2) {
    //     this.flag = 'Inactive';
    //   }
      this.dataObjforExcel = {
        // 'ID': this.workList[i].id,
        'DATE': this.workList[i].date,
        'SCORE': this.workList[i].score
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