import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { Router, UrlTree } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  failed: Boolean = false;
  constructor(private fb: FormBuilder, private us: UserService, private router: Router) { 
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      username: ['', Validators.required ]
    });
  }

  getFormPropError(propName: string) {
    return (this.formGroup.controls[propName].invalid && 
      (this.formGroup.controls[propName].dirty || this.formGroup.controls[propName].touched)) ? 
      this.formGroup.controls[propName].errors : null;
  }
  
  login(username: string) {
    this.us.login(username).subscribe((user: any) => {
      this.failed = !user;
      if (user) {
        const urlTree: UrlTree = this.router.parseUrl(this.router.url);
        this.router.navigateByUrl(urlTree.queryParams.return || '/');
      }
    });
  }

  ngOnInit() {
  }
}
