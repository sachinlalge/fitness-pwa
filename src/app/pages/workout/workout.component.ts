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
  tenRecords: any = [];
  infinitespinner: boolean = false;

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
     
    }

   
    ngOnInit() {
      this.userData = this.passServ.workoutUser;
      console.log('WorkuserData', this.userData);
      if (!this.userData) {
        this.router.navigate(['pages/dashboard']);
      } else if (this.userData) {
        this.spinner.show();
        this.getWorkoutUsers();
        // setTimeout(() => {
        //   this.spinner.hide();
        // }, 1000);
      }
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
        'DATE': this.workList[i].actDate,
        'POSITION': this.workList[i].positionName,
        'ANGLE': this.workList[i].leanangle,
        'TIME': this.workList[i].actTime,
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
      // console.log('test res', res);
      this.spinner.hide();
      try {
        if (res.type === true) {
          // console.log('res', res);
          try {
            this.workList = res.data;
            console.log('this.workList',this.workList);
            for(let i = 0; i < this.workList.length; i++) {
              if(i < 10) {
                this.tenRecords.push(this.workList[i]);
              }
            }
          } catch (e) {
            console.log(e);
          }
        }
        if (res.type === false) {
          this.spinner.hide();
          console.log('res', res);
        }
      } catch (e) {
        console.log(e);
      }
    },
    err => {
      console.log(err);
      this.toastr.error(msg.severerror);
    });
  }

  onScrollDown() {
    console.log();
    var startint = this.tenRecords.length;
    var endint = this.tenRecords.length +  10;
    if(this.workList.length >= startint && !this.infinitespinner){
      this.infinitespinner = true;
      var newarray = [];
      if(this.workList.length <= endint){
        endint = this.workList.length;
      }
      for(let i = startint; i < endint; i++) {
        newarray.push(this.workList[i]);
      }
      
      setTimeout(() => {
        this.tenRecords = this.tenRecords.concat(newarray);
        // console.log("10 records length", this.tenRecords);
        this.infinitespinner = false;
      }, 1000);
    }
  }
}
