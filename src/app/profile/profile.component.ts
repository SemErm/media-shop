import { Component } from "@angular/core";
import { Auth } from "../shared/services/auth.service";

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private auth: Auth) {
  }

}
