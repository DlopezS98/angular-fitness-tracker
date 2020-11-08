import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';

const routes: Routes = [
    //the route is empty because it's already declared in app-routing.module.ts / doesn't refer to the initial route ('/')
  { path: '', component: TrainingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {}
