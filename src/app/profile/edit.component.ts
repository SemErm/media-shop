import {Component, OnInit} from "@angular/core";
import {Auth} from "../shared/services/auth.service";

import {Router} from "@angular/router";
import "rxjs/add/operator/map";
import {Location} from "@angular/common";

@Component({
  moduleId: module.id,
  selector: 'profile-edit',
  templateUrl: './edit.component.html'
})

export class ProfileEditComponent implements OnInit {

  user = {};

  constructor(private auth: Auth,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    if (this.auth.authenticated() && this.auth.userProfile) {
      this.user = this.auth.userProfile;
    }
  }

  onSubmit() {
    this.auth.updateProfile(this.user);
    this.router.navigate(['/profile']);
  }

  goBack() {
    this.location.back();
  }

}
