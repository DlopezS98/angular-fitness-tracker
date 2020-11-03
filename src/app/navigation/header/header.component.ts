import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //Creación de un evento personalizado
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onToggleSideNav() {
    this.sidenavToggle.emit();
  }
}
