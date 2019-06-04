import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user:User;
  constructor(private http: HttpClient, private router: Router) { }

  login(username: string) {
    return this.http.post(`/api/login`, { username })
    .pipe(map((data: any) => {
      if (!data.success) {
        return null;
      }
      this.user = new User(data.user.username);
      return this.user;
    }));
  }
  logout() {
    this.user = null;
    this.http.get(`/api/logout`).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
