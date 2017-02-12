import {Component, OnInit} from "@angular/core";
import {Auth} from "../shared/services/auth.service";

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{
    constructor(private auth: Auth){}

    ngOnInit(){
      console.log(this.auth.profiles);
    }

}
