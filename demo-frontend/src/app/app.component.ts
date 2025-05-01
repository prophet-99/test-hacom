import { Component, inject } from '@angular/core';
import { HeaderDrawerStateService } from '@core/components/header/header-drawer-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  headerDrawerState = inject(HeaderDrawerStateService);
}
