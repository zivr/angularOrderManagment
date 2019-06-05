import { Component } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';
import { UserService } from './user/user.service';
import { User } from './user/User';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  get currentUser (): User {
    return this.us.user;
  }
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, private us: UserService) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  ngOnInit() {
    this.us.fetchUserInfo().subscribe();
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    else if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    else if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    else if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }
}
