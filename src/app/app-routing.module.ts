import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityGuard } from "./services/security.guard";
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
    canActivate: [SecurityGuard],
  },
  {
    path: 'thankyou',
    component: ThankyouComponent,
    canActivate: [SecurityGuard],
  },
  {
    path: 'winner',
    component: WinnerComponent,
    canActivate: [SecurityGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
