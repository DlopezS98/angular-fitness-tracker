import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../../../services/auth.service';
import * as RootReducerStore from '../../../reducers/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //Creación de un evento personalizado
  isAuth$: Observable<boolean>;

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private store: Store<RootReducerStore.State>, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(RootReducerStore.getIsAuthenticated);
  }

  onToggleSideNav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.authService.logout();
  }
}
