import { Component } from "@angular/core";
import { Auth } from "../shared/services/auth.service";

@Component({
  moduleId: module.id,
  selector: 'profile-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileToastsComponent {
  constructor(private auth: Auth) {
  }
}
