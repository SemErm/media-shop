import {Component, OnInit} from "@angular/core";
import {BasketService} from "../shared/services/basket.service";
import * as _ from "lodash";
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
  private basketsItems = [];
  private totalPrice;

  constructor(private basketService: BasketService,
              private router: Router,
              private toasterService: ToasterService,
              private auth: Auth) {
  }

  ngOnInit() {
    this.auth.auth
      .subscribe(() => {
        this.calcTotalPrice();
        this.basketsItems = _.chunk(this.basketService.getItems(), 6);
      });
    if (this.auth.userProfile) {
      this.calcTotalPrice();
      this.basketsItems = _.chunk(this.basketService.getItems(), 6);
    }
  }

  calcTotalPrice() {
    this.totalPrice = _.sumBy(this.basketService.getItems(), (item) => {
      return +item.price;
    });
  }

  remove(item) {
    this.basketService.removeItem(item);
    if (this.auth.userProfile.toasts.warning)
      this.toasterService.pop('warning', 'Delete', `${item.name} ${item.type}`);
    this.basketsItems = _.chunk(this.basketService.getItems(), 6);
    this.calcTotalPrice();
  }

  goToDetail(item) {
    this.router.navigate(['product'], {queryParams: {'type': item.type, id: item.id}});
  }
}
