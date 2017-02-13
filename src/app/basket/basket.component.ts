import {Component, OnInit} from "@angular/core";
import {BasketService} from "../shared/services/basket.service";
import * as _ from 'lodash';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  moduleId: module.id,
  selector: 'basket',
  templateUrl: 'basket.component.html',
  styleUrls: ['basket.component.css']
})

export class BasketComponent implements OnInit {
  private basketsItems;

  constructor(private basketService: BasketService,
              private router: Router) {
  }

  ngOnInit() {
    this.basketsItems = _.chunk(this.basketService.getItems(), 6);
  }

  remove(item){
    this.basketService.removeItem(item);
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
