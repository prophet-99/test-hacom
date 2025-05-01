import { Component, inject } from '@angular/core';

import { HeaderDrawerStateService } from './header-drawer-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  headerDrawerState = inject(HeaderDrawerStateService);
}
