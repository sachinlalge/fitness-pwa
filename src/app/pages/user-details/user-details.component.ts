import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GoToDashboardService } from 'src/app/service/go-to-dashboard.service';
import { PassServiceService } from 'src/app/service/pass-service/pass-service.service';
import { GetUserDetailsService } from 'src/app/service/get-user-details-service/get-user-details.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { msg } from '../../../messages';
import { ExcelService } from 'src/app/service/excel-service/excel.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss','../../app.component.scss'],
  providers: [ExcelService]
})
export class UserDetailsComponent implements OnInit {
  user: any = [];
  userFiles: any = [];
  userDetails: any = [];

  p: number = 1;
  arrow = false;
  isDesc: any = [];
  column: any = [];
  search:any={};
  dataObjforExcel: any = [];
  dataArrayforExcel: any = [];
  dropdownName: any;
  tenRecords: any = [];
  infinitespinner: boolean = false;

  constructor(
    private router: Router,
    public dash: GoToDashboardService,
    private excelService: ExcelService,
    private passServ: PassServiceService,  
    private userDetailServ: GetUserDetailsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService    
  ) { }

  ngOnInit() {
    this.userDetails = this.passServ.userDetail;
      console.log('pass userDetails', this.userDetails);
      if (!this.userDetails) {
        this.router.navigate(['pages/dashboard']);
      } else if (this.userDetails) {
        this.geUserDetails();
      }
    }

  // sort 
  // sort(property) {
  //   this.isDesc = !this.isDesc; // change the direction
  //   this.column = property;
  //   const direction = this.isDesc ? 1 : -1;

  //   this.userDetails.sort(function (a, b) {
  //     if (a[property] < b[property]) {
  //       return -1 * direction;
  //     } else if (a[property] > b[property]) {
  //       return 1 * direction;
  //     } else {
  //       return 0;
  //     }
  //   });
  // }

  exportExcel() {
    this.dataArrayforExcel = [];
    this.dataObjforExcel = {
    'NAME': this.user.uname,
    'GENDER': this.user.gender,
    'AGE': this.user.age,
    'WEIGHT': this.user.weight,
    'HEIGHT': this.user.height,
    'POSITION ': this.user.positionName,
    'LEAN ANGLE': this.user.leanangle,
    'ISO OR DYN': this.user.isoOrdyn,
    'WNO': this.user.WNo
    }
    this.dataArrayforExcel.push(this.dataObjforExcel);
    for (let i = 0; i < this.userFiles.length; i++) {
      this.dataObjforExcel = {
        'NAME': this.userFiles[i].time,
        'GENDER': this.userFiles[i].roll,
        'AGE': this.userFiles[i].pitch,
        'WEIGHT': this.userFiles[i].yaw,
        'HEIGHT': this.userFiles[i].pressLeft,
        'POSITION ': this.userFiles[i].pressRight,
      }
      this.dataArrayforExcel.push(this.dataObjforExcel);
    }
    console.log('excel',this.dataObjforExcel)
    this.exportAsXLSX();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.dataArrayforExcel, 'Details');
  }

  geUserDetails() {
    const data = {
      unm : this.userDetails.uname,
      pos : this.userDetails.position,
      actd : this.dateFormat(this.userDetails.actDate)
    }    
    this.userDetailServ.getUserDetails(data).then(res => {
      this.spinner.hide();
      try {
        if (res.type === true) {
          // console.log('res', res);
          try {
            this.user = res.userdata[0];
            this.userFiles = res.filedata;
            console.log('this.userDetails',this.user);
            console.log('this.userFiles',this.userFiles);
            for(let i = 0; i < this.userFiles.length; i++) {
              if(i < 10) {
                this.tenRecords.push(this.userFiles[i]);
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
    if(this.userFiles.length >= startint && !this.infinitespinner){
      this.infinitespinner = true;
      var newarray = [];
      if(this.userFiles.length <= endint){
        endint = this.userFiles.length;
      }
      for(let i = startint; i < endint; i++) {
        newarray.push(this.userFiles[i]);
      }
      
      setTimeout(() => {
        this.tenRecords = this.tenRecords.concat(newarray);
        console.log("10 records length", this.tenRecords);
        this.infinitespinner = false;
      }, 1000);
    }
  }

  dateFormat(adate) {
    var date = new Date(adate);
		var da = String(date.getDate());
		var mon = String(date.getMonth()+1);
		var year = String(date.getFullYear());
		if (parseInt(mon) < 10) {
			mon = '0' + mon;
		}
		if (parseInt(da) < 10) {
			da = '0' + da;
		}
		let filteredDate = year + '-' + mon + '-' + da;
    return filteredDate;
  }
}
