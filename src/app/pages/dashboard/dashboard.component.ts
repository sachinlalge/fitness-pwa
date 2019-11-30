import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/service/excel-service/excel.service';
import { GetAllUsersService } from '../../service/get-all-users/get-all-users.service';
import { PassServiceService } from '../../service/pass-service/pass-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { msg } from '../../../messages';
import { HostListener } from "@angular/core";
import { FileUploader, FileLikeObject } from 'ng2-file-upload';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss','../../app.component.scss'],
  providers: [ExcelService],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  // @HostListener('window:resize', ['$event'])

  scrHeight:any;
  scrWidth:any;

  userlist: any = [];
  // userlist1: any = [
  //   { id: 1, name: 'Scarlett Johansson', gender: 'Female', age: '2019', weight: '67' },
  //   { id: 3, name: 'Morena Baccarin ', gender: 'Female', age: '2018', weight: '98' },
  //   { id: 9, name: 'Chris Hemsworth ', gender: 'Male', age: '2018', weight: '59' },
  //   { id: 5, name: 'Sophie Turner', gender: 'Female', age: '2019', weight: '20' },
  //   { id: 9, name: 'Don Cheadle ', gender: 'Male', age: '2018', weight: '59' },
  //   { id: 6, name: 'Simone Missick ', gender: 'Female', age: '2018', weight: '45' },
  //   { id: 7, name: ' Samuel L. Jackson ', gender: 'Male', age: '2019', weight: '73' },
  //   { id: 8, name: 'Robert Downey Jr. ', gender: 'Male', age: '2019', weight: '82' },
  //   { id: 9, name: 'Paul Bettany ', gender: 'Male', age: '2018', weight: '59' },
  //   { id: 4, name: 'Emma Stone ', gender: 'Female', age: '2019', weight: '90' },
  //   { id: 9, name: 'Chris Evans ', gender: 'Male', age: '2018', weight: '59' },
  //   { id: 2, name: 'Elizabeth Olsen ', gender: 'Female', age: '2018', weight: '43' },
  //   { id: 9, name: 'Jon Favreau ', gender: 'Male', age: '2018', weight: '59' },
  // ];
  p: number = 1;
  arrow = false;
  isDesc: any = [];
  column: any = [];
  search:any={};
  dataObjforExcel: any = [];
  dataArrayforExcel: any = [];
  tenRecords: any = [];
  infinitespinner: boolean = false;

  constructor(
    private router: Router, 
    private excelService: ExcelService, 
    private getUsersServ: GetAllUsersService,
    private passServ: PassServiceService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private cdf: ChangeDetectorRef
  ) {
    this.getScreenSize();
  }

  ngOnInit() {
    this.spinner.show();
    this.getUsers();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 1000);
  }

  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log('screen height', this.scrWidth);
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
        'ID': this.userlist[i].id,
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
          for(let i = 0; i < this.userlist.length; i++) {
            if(i < 10) {
              this.tenRecords.push(this.userlist[i]);
              // console.log('ten records', this.tenRecords);
            }
          }
          } catch (e) {
            console.log(e);
          }
        }
        if (res.type === false) {
          this.spinner.hide();
          // console.log('res', res);
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

  onScrollUp() {
    // this.tenRecords = this.tenRecords.concat(this.getUsers());
    console.log();
  }

  onScrollDown() {
    var startint = this.tenRecords.length;
    var endint = this.tenRecords.length +  10;
    if(this.userlist.length >= startint && !this.infinitespinner){
      this.infinitespinner = true;
      var newarray = [];
      if(this.userlist.length <= endint){
        endint = this.userlist.length;
      }
      for(let i = startint; i < endint; i++) {
        newarray.push(this.userlist[i]);
      }
      
      setTimeout(() => {
        this.tenRecords = this.tenRecords.concat(newarray);
        // console.log("10 records length", this.tenRecords);
        this.infinitespinner = false;
      }, 1000);
    }
  }

  // upload excel
  public uploader:FileUploader = new FileUploader({
    // url: URL, 
    disableMultipart:true
    });
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  fileObject: any;


  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e; 
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];

    console.log(file);

    // readBase64(file)
      // .then(function(data) {
      // console.log(data);
    // })

  }

}