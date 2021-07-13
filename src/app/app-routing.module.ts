import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { CodecuponComponent } from './codecupon/codecupon.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { WinnerComponent } from './winner/winner.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'codecupon',
    component: CodecuponComponent,
  },
  {
    path: 'thankyou',
    component: ThankyouComponent,
  },
  {
    path: 'winner',
    component: WinnerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
