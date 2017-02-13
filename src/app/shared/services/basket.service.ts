import {Injectable} from "@angular/core";
import * as _ from 'lodash';
import {Observable, Subscription} from "rxjs";

interface basket {
  clientID: number,
  items: Array<any>
}

@Injectable()
export class BasketService {
  public currentBasket: basket;
  public basketsUsers: Array<basket>;

  addItem(item) {
    if (this.currentBasket) {
      this.currentBasket.items.push(item);
      this.updateBaskets();
    }
  }

  getBasket(clientID) {
    if (this.basketsUsers = JSON.parse(localStorage.getItem('baskets'))) {
      console.log('get basketsUsers');
      this.currentBasket = _.find(this.basketsUsers, (bask) => {
        return bask.clientID === clientID
      });
    }
    else {
      this.currentBasket = {
        clientID: clientID,
        items: []
      };
      this.updateBaskets();
    }
    return this.currentBasket;
  }

  updateBaskets() {
    this.basketsUsers = JSON.parse(localStorage.getItem('baskets'));
    this.basketsUsers = _.remove(this.basketsUsers, (bask) => {
      return bask.clientID !== this.currentBasket.clientID;
    });
    this.basketsUsers.push(this.currentBasket);
    localStorage.setItem('baskets', JSON.stringify(this.basketsUsers));
  }

  removeItem(removeItem) {
    this.currentBasket.items = _.remove(this.currentBasket.items, (item) => {
      return (item.type !== removeItem.type || item.id !== removeItem.id)
    });
    this.updateBaskets();
  }

  getItems() {
    return this.currentBasket.items;
  }

  countItems() {
    return this.currentBasket ? this.currentBasket.items.length : 0;
  }
}
