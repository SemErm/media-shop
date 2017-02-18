import {Component, OnInit} from "@angular/core";
import {Auth} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import "rxjs/add/operator/map";
import {Location} from "@angular/common";
import {ToasterService} from "angular2-toaster";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'profile-edit',
  templateUrl: './edit.component.html'
})

export class ProfileEditComponent implements OnInit {
  private editForm: FormGroup;
  user: any;

  constructor(private auth: Auth,
              private router: Router,
              private location: Location,
              private toasterService: ToasterService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    if (!this.auth.authenticated() || !this.auth.userProfile) return;
    this.user = this.auth.userProfile;
    this.editForm = this.fb.group({
      given_name: this.user.given_name || [''],
      family_name: this.user.family_name || [''],
      nickname: this.user.nickname || [''],
      email: this.user.email || [''],
      telephone: this.user.telephone || [''],
      currency: this.user.currency || ['']
    });
    this.editForm.valueChanges
      .subscribe(res => {
        for (let field of Object.keys(res)) {
          this.user[field] = res[field];
        }
      });
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
