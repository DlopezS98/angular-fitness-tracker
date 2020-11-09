import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as RootReducerStore from '../../reducers/app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<RootReducerStore.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.store.select(RootReducerStore.getIsAuthenticated);
    return this.store.select(RootReducerStore.getIsAuthenticated).pipe(take(1));
  }

  canLoad(route: Route) {
    // return this.store.select(RootReducerStore.getIsAuthenticated);
    return this.store.select(RootReducerStore.getIsAuthenticated).pipe(take(1));
  }
}
