import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { BlankRountingComponentComponent } from './blank-rounting-component/blank-rounting-component.component';
// import  { NavbarComponent } from './navbar/navbar.component';
// import  { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    BlankRountingComponentComponent,
    // NavbarComponent,
    // SidebarComponent
  ],

  exports: [
    BlankRountingComponentComponent,
    // NavbarComponent,
    // SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
