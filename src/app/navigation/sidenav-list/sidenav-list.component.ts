import { AuthService } from '../../services/auth.service';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  IsAuth: boolean = false;
  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authState) => {
        this.IsAuth = authState;
      }
    );
  }

  onCloseSideNav() {
    this.closeSidenav.emit();
  }

  logout() {
    this.onCloseSideNav();
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
