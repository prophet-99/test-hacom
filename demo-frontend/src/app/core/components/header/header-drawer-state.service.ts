import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderDrawerStateService {
  #drawerStateSubject = new BehaviorSubject(true);
  drawerState$ = this.#drawerStateSubject.asObservable();

  toggleDrawer() {
    this.#drawerStateSubject.next(!this.#drawerStateSubject.value);
  }
}
