import {Component, OnInit} from "@angular/core";
import {Auth} from "../shared/services/auth.service";

import {Router} from "@angular/router";
import "rxjs/add/operator/map";
import {Location} from "@angular/common";
import {ToasterService} from 'angular2-toaster';

@Component({
  moduleId: module.id,
  selector: 'profile-edit',
  templateUrl: './edit.component.html'
})

export class ProfileEditComponent implements OnInit {

  user = {};

  constructor(private auth: Auth,
              private router: Router,
              private location: Location,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    if (this.auth.authenticated() && this.auth.userProfile) {
      this.user = this.auth.userProfile;
    }
  }

  onSubmit() {
    this.auth.updateProfile(this.user);
    if (this.auth.userProfile.toasts.success)
      this.toasterService.pop('success', 'Edit profile', '');
    this.router.navigate(['/profile']);
  }

  goBack() {
    if (this.auth.userProfile.toasts.success)
      this.toasterService.pop('error', 'Cancel edit', '');
    this.location.back();
  }

}
