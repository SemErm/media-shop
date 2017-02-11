import {Component} from "@angular/core";
import {Auth} from "../shared/services/auth.service";

@Component({
  moduleId: module.id,
  selector: 'profile-addresses',
  templateUrl: './addresses.component.html'
})

export class ProfileAddressesComponent{
  constructor(private auth: Auth){}
}
