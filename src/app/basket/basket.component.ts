import {Component, OnInit} from "@angular/core";
import {BasketService} from "../shared/services/basket.service";
import * as _ from 'lodash';
import {Router} from "@angular/router";
import {ToasterService} from "angular2-toaster";
import {Auth} from "../shared/services/auth.service";

@Component({
  moduleId: module.id,
  selector: 'basket',
  templateUrl: 'basket.component.html',
  styleUrls: ['basket.component.css']
})

export class BasketComponent implements OnInit {
  private basketsItems;

  constructor(private basketService: BasketService,
              private router: Router,
              private toasterService: ToasterService,
              private auth: Auth) {
  }

  ngOnInit() {
    this.auth.auth
      .subscribe(() => {
        this.basketsItems = _.chunk(this.basketService.getItems(), 6);
      });
    if(this.auth.userProfile){
      this.basketsItems = _.chunk(this.basketService.getItems(), 6);
    }
  }

  remove(item) {
    this.basketService.removeItem(item);
    if (this.auth.userProfile.toasts.warning)
      this.toasterService.pop('warning', 'Delete', 'id-' + item.id + ' ' + item.type);
    this.basketsItems = _.chunk(this.basketService.getItems(), 6);
  }

  goToDetail(item) {
    switch (item.type) {
      case 'movie': {
        this.router.navigate(['movies', item.id]);
        break;
      }
    }
  }
}
