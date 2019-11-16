import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoToDashboardService } from '../../service/go-to-dashboard.service';
import { ExcelService } from 'src/app/service/excel-service/excel.service';
import { PassServiceService } from 'src/app/service/pass-service/pass-service.service';
import { GetUserWorkService } from 'src/app/service/get-user-work-service/get-user-work.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { msg } from '../../../messages';


@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss','../../app.component.scss'],
  providers: [ExcelService]
})
export class WorkoutComponent implements OnInit {
  // @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  userData: any = [];
  workList: any = [
    // { id: 1, date: 'Nov 23, 2019', position: 'Prone', angle: '20', time: '02:00'},
    // { id: 2, date: 'Dec 29, 2019', position: 'Supine', angle: '45', time: '01:10'},
    // { id: 3, date: 'Jan 30, 2019', position: 'Lateral', angle: '65', time: '04:00'},
    // { id: 4, date: 'Feb 5, 2019', position: 'Lateral', angle: '85', time: '07:45'},
    // { id: 5, date: 'Mar 21, 2019', position: 'Supine', angle: '45', time: '12:00'},
    // { id: 6, date: 'Apri 11, 2019', position: 'Lateral', angle: '67', time: '01:00'},
    // { id: 7, date: 'Jun 27, 2019', position: 'Supine', angle: '45', time: '05:00'},
    // { id: 8, date: 'Nov 23, 2019', position: 'Prone', angle: '64', time: '03:00'},
    // { id: 9, date: 'Dec 29, 2019', position: 'Lateral', angle: '87', time: '03:21'},
    // { id: 10, date: 'Jan 30, 2019', position: 'Supine', angle: '12', time: '12:00'},
    // { id: 11, date: 'Feb 5, 2019', position: 'Prone', angle: '34', time: '02:00'},
    // { id: 12, date: 'Mar 21, 2019', position: 'Lateral', angle: '56', time: '04:44'},
    // { id: 13, date: 'Apri 11, 2019', position: 'Supine', angle: '10', time: '06:56'},
    // { id: 14, date: 'Jun 27, 2019', position: 'Prone', angle: '50', time: '09:00'},
  ];
  p: number = 1;
  arrow = false;
  isDesc: any = [];
  column: any = [];
  search:any={};
  dataObjforExcel: any = [];
  dataArrayforExcel: any = [];
  dropdownName: any;
  typeList: any = [
    {name: 'All', value: ''},
    {name: 'Prone', value: 'p'},
    {name: 'Supine', value: 's'},
    {name: 'Right Lateral', value: 'r'}, 
    {name: 'Left Lateral', value: 'l'},
  ];
  conentHeight: string;
  offset: number = 0;

  constructor(private router: Router,
    public dash: GoToDashboardService,
    private excelService: ExcelService,
    private passServ: PassServiceService,
    private workSer: GetUserWorkService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService    
  ) { 
      this.search = {
        position: '',
      };
      this.conentHeight = '0px';
      this.userData = this.passServ.workoutUser;
      console.log('WorkuserData', this.userData);
    }

    ngAfterViewInit() {
      const e = document.getElementsByClassName('infinite');
      console.log(e[0].clientHeight);
      this.conentHeight = String(e[0].clientHeight - this.offset) + 'px';
      console.log('scroll infinte',e);
    }
   
    ngOnInit() {
      this.spinner.show();
      this.getWorkoutUsers();
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    
    // filter(val) {
    //   this.dropdownName = val;
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
      this.dataObjforExcel = {
        // 'ID': this.workList[i].id,
        'DATE': this.workList[i].date,
        'POSITION': this.workList[i].position,
        'ANGLE': this.workList[i].angle,
        'TIME': this.workList[i].time,
      }
      console.log('this.dataArray',this.dataObjforExcel)
      this.dataArrayforExcel.push(this.dataObjforExcel);
    }
    this.exportAsXLSX();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.dataArrayforExcel, 'Details');
  }

  getWorkoutUsers() {
    const data = {
      ucode: this.userData.uname,
    }
    this.workSer.getWorkUsers(data).then(res => {
      console.log('test res', res);
    //   this.spinner.hide();
      try {
        if (res.type === true) {
          console.log('res', res);
          try {
          this.workList = res.data;
          console.log('this.workList',this.workList);
          // this.setveractive = false;
          } catch (e) {
            console.log(e);
          }
        }
        if (res.type === false) {
          // this.spinner.hide();
          console.log('res', res);
          // if(this.featureList.length === 0){
          //   this.featureLength = false;
          // } else if(this.featureList.length > 0){
          //   this.featureLength = true;
          // }/
        }
      } catch (e) {
        console.log(e);
      }
    },
    err => {
      console.log(err);
      // this.spinner.hide();
      // this.setveractive = true;
      // this.featureList = [];
      this.toastr.error(msg.severerror);
    });
  }

  // infinte scroll
  // onScroll(event) {
  //   let element = this.myScrollContainer.nativeElement;
  //   // element.style.height = '500px';
  //   // element.style.height = '500px';
  //   // Math.ceil(element.scrollHeight - element.scrollTop) === element.clientHeight
  //   if (element.scrollHeight - element.scrollTop - element.clientHeight < 20) {
  //       console.log(element);
  //     // if (!this.isworking) {
  //       // this.currentPage++;
  //       // if (this.currentPage <= this.totalPages) {
  //       //   this.isworking = true;
  //       //   this.getCategories(this.str, this.currentPage);
  //       // }
  //     // }
  //   }
  // }
}
