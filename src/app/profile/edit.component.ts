import {Component} from "@angular/core";
import {Auth} from "../shared/services/auth.service";

import {Router} from "@angular/router";
import "rxjs/add/operator/map";

@Component({
  moduleId: module.id,
  selector: 'profile-edit',
  templateUrl: './edit.component.html'
})

export class ProfileEditComponent{

  constructor(private auth: Auth,
              private router: Router) {

  }

}
