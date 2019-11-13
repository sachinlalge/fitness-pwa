import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GoToDashboardService {
  variable: boolean;

  constructor(private router: Router) { }


  backtoPage() {
    this.router.navigate(['pages/dashboard']);
  }
}
