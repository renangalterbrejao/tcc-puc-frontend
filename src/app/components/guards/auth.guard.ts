import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    return this.verificarAcesso();

  }

  private verificarAcesso() {
    if (this.loginService.isUsuarioAutenticado()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {

    return this.verificarAcesso();

  }
}
