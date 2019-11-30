import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../service/login/login.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { msg } from '../../../messages';

// import { GoToDashboardService } from '../service/go-to-dashboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @Output() pageChanged = new EventEmitter<{server: boolean}>();
  // dashboard: boolean = true;
  registerForm: FormGroup;
  submitted = false;
  userD: any = [];

  constructor( 
    private router: Router,
    private loginSer: LoginService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }
  
  ngOnInit() {
    // this.dash.variable = this.dashboard;
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  gotoPage() {
    this.router.navigate(['/pages']);
    // this.pageChanged.emit({server: this.dashboard});
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      // if (!this.registerForm.value.username || !this.registerForm.value.password) {
      //   this.toastr.error(msg.requiredUP);
      // }
      return;
    } else {      
      this.spinner.show();
      const params = {
        usn : this.registerForm.value.username,
        pass : this.registerForm.value.password,
      }
      this.loginSer.loginUser(params).then(res => {
        try {
          if (res.type === true) {
            if (res.data.length  === 0) {
              this.toastr.error(msg.invalidUP);
              this.spinner.hide();
            } else {
                console.log('res', res);
                try {
                this.userD = res.data[0];
                localStorage.setItem('UserName', JSON.stringify(this.userD.username));
                localStorage.setItem('UserData', JSON.stringify(this.userD));
                this.router.navigate(['/pages']);
                setTimeout(() => {
                  this.spinner.hide();
                  this.toastr.success(msg.loginsuc);
                }, 1000);
              } 
              catch (e) {
                console.log(e);
              }
            }
          }
          if (res.type === false) {
            this.spinner.hide();
            console.log('res', res);
            this.toastr.error(msg.loginerror);
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
  }

}
