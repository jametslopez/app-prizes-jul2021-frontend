import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppprizesService } from './appprizes.service';

@Injectable()
export class SecurityGuard implements CanActivate {
  constructor(
    private appprizesService: AppprizesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (this.appprizesService.email) {
      console.log('pass');
      return true;
    }
    this.router.navigate(['/home'], { relativeTo: this.route });
    console.log('fail');
    return false;
  }
}
