import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { BlankRountingComponentComponent } from './components/blank-rounting-component/blank-rounting-component.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from './test/test.component';
import { WorkoutComponent } from './workout/workout.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'test', component: TestComponent },
    { path: 'workout', component: WorkoutComponent  },

  // { path: 'test', loadChildren: 'test/test.module.ts#TestModule' },
    

    // { path: '', component: BlankRountingComponentComponent,
    //     children : [
    //     {path: 'test', component: TestComponent },
    //     ],
    // },
//   {
//     path: '**',
//     component: NotFoundComponent,
//   }
    ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
