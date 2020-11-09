import { WelcomeComponent } from './components/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  //config for lazy load
  {
    path: 'training',
    loadChildren: () =>
      import('./components/training/training.module').then((md) => md.TrainingModule),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
