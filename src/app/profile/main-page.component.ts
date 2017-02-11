import {Component} from "@angular/core";
import {Auth} from "../shared/services/auth.service";

@Component({
  moduleId: module.id,
  selector: 'profile-main-page',
  templateUrl: './main-page.component.html'
})

export class ProfileMainPageComponent{
  constructor(private auth: Auth){}
}
