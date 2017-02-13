import {Component, OnInit} from "@angular/core";
import {Auth} from "../shared/services/auth.service";
import {BasketService} from "../shared/services/basket.service";

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private auth: Auth,
              private basket: BasketService) {
  }

  ngOnInit() {
    console.log(this.auth.userProfile);
    console.log(this.basket.basketsUsers);
  }
}
