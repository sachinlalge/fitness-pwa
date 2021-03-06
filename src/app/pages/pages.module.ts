import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// import { AngularPaginatorModule } from 'angular-paginator';
import { NgxPaginationModule} from 'ngx-pagination';
import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { ComponentsModule } from './components/components.module';
import { PagesRoutingModule } from './pages-routing.module';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TablesComponent } from './tables/tables.component';
import { PagesComponent } from './pages.component';
import { TestComponent } from './test/test.component';
import { WorkoutComponent } from './workout/workout.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];
@NgModule({
  declarations: [
    // AngularPaginatorModule,
    // LoginComponent,
    // BlankRountingComponentComponent,
    NavbarComponent,
    SidebarComponent,
    ...PAGES_COMPONENTS,
    DashboardComponent,
    TablesComponent,
    TestComponent,
    WorkoutComponent,
    UserDetailsComponent, 
 ],
  imports: [
    CommonModule,
    ComponentsModule, 
    PagesRoutingModule,
    NgxPaginationModule,
    FilterPipeModule,
    FormsModule,
    NgxInfiniteScrollerModule
    // ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ]
})
export class PagesModule { }
