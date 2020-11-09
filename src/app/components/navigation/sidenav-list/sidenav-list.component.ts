import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '../../../services/auth.service';
import * as RootReducerStore from '../../../reducers/app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  IsAuth$: Observable<boolean>;
  @Output() closeSidenav = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private store: Store<RootReducerStore.State>
  ) {}

  ngOnInit(): void {
    this.IsAuth$ = this.store.select(RootReducerStore.getIsAuthenticated);
  }

  onCloseSideNav(): void {
    this.closeSidenav.emit();
  }

  logout(): void {
    this.onCloseSideNav();
    this.authService.logout();
  }
}
