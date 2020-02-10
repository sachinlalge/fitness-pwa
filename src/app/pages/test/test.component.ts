import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { GoToDashboardService } from 'src/app/service/go-to-dashboard.service';
import { ExcelService } from 'src/app/service/excel-service/excel.service';
import { PassServiceService } from 'src/app/service/pass-service/pass-service.service';
import { GetUserTestService } from 'src/app/service/get-user-test-service/get-user-test.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { msg } from '../../../messages';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss','../../app.component.scss'],
  providers: [ExcelService]
})
export class TestComponent implements OnInit {
  userData: any = [];
  testList: any = [
    // { id: 1, date: 'Nov 23, 2019', score: '32'},
    // { id: 2, date: 'Dec 29, 2019', score: '65'},
    // { id: 3, date: 'Jan 30, 2019', score: '75'},
    // { id: 4, date: 'Feb 5, 2019', score: '43'},
    // { id: 5, date: 'Mar 21, 2019', score: '86'},
    // { id: 6, date: 'Apri 11, 2019', score: '234'},
    // { id: 7, date: 'Jun 27, 2019', score: '56'},
    // { id: 8, date: 'Nov 23, 2019', score: '32'},
    // { id: 9, date: 'Dec 29, 2019', score: '65'},
    // { id: 10, date: 'Jan 30, 2019', score: '75'},
    // { id: 11, date: 'Feb 5, 2019', score: '43'},
    // { id: 12, date: 'Mar 21, 2019', score: '86'},
    // { id: 13, date: 'Apri 11, 2019', score: '234'},
    // { id: 14, date: 'Jun 27, 2019', score: '56'},
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
    {name: 'Prone', value: 'p'},
    {name: 'Supine', value: 's'},
    {name: 'Right Lateral', value: 'r'}, 
    {name: 'Left Lateral', value: 'l'},
  ];
  // getPara: any;
  tenRecords: any = [];
  infinitespinner: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public dash: GoToDashboardService,
    private excelService: ExcelService,
    private passServ: PassServiceService,  
    private testServ: GetUserTestService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService    
  ) { 
      this.search = {
        position: 'p',
      };
      this.userData = this.passServ.testUser;
      console.log('TestuserData', this.userData);
    }

  ngOnInit() {
    if (!this.userData) {
      this.router.navigate(['pages/dashboard']);
    } else if (this.userData) {
      this.spinner.show();
      this.getTestuser();
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }

    // this.route.queryParams
    //   .filter(params => params.order)
    //   .subscribe(params => {
    //     console.log(params); 

    //     this.getPara = params.order;
    //     console.log(this.getPara); 
    //   });
  }

  filter(val) {
    this.dropdownName = val;
  }                                       

  // sort 
  sort(property) {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    const direction = this.isDesc ? 1 : -1;

    this.testList.sort(function (a, b) {
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
    for (let i = 0; i < this.testList.length; i++) {
    //   if (this.posts[i].isActive === 1) {
    //     this.flag = 'Active';
    //   }
    //   if (this.posts[i].isActive === 2) {
    //     this.flag = 'Inactive';
    //   }
      this.dataObjforExcel = {
        // 'ID': this.testList[i].id,
        'DATE': this.testList[i].actDate,
        'SCORE': this.testList[i].CS
      }
      console.log('this.dataArray',this.dataObjforExcel)
      this.dataArrayforExcel.push(this.dataObjforExcel);
    }
    this.exportAsXLSX();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.dataArrayforExcel, 'Details');
  }

  gotoUserDetails(data) {
    this.passServ.userDetail = data;
    this.router.navigate(['pages/user-details']);    
  }

  getTestuser() {
    const data = {
      ucode: this.userData.uname,
      posi: this.search.position
    }
    this.spinner.show();
    this.testServ.getTestUsers(data).then(res => {
      // console.log('test res', res);
      this.spinner.hide();
      try {
        if (res.type === true) {
          try {
            this.testList = res.data;
            console.log('testList', this.testList);
            for(let i = 0; i < this.testList.length; i++) {
              if(i < 10) {
                this.tenRecords.push(this.testList[i]);
              }
            }
          } catch (e) {
            console.log(e);
          }
        }
        if (res.type === false) {
          this.spinner.hide();
        }
      } catch (e) {
        console.log(e);
      }
    },
    err => {
      console.log(err);
      this.spinner.hide();
      this.toastr.error(msg.severerror);
    });
  }

  onScrollDown() {
    console.log();
    var startint = this.tenRecords.length;
    var endint = this.tenRecords.length +  10;
    if(this.testList.length >= startint && !this.infinitespinner){
      this.infinitespinner = true;
      var newarray = [];
      if(this.testList.length <= endint){
        endint = this.testList.length;
      }
      for(let i = startint; i < endint; i++) {
        newarray.push(this.testList[i]);
      }
      
      setTimeout(() => {
        this.tenRecords = this.tenRecords.concat(newarray);
        // console.log("10 records length", this.tenRecords);
        this.infinitespinner = false;
      }, 1000);
    }
  }
}