import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {BasketService} from "../services/basket.service";
import {ToasterService} from "angular2-toaster";
import {Auth} from "../services/auth.service";
@Component({
  moduleId: module.id,
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent {
  @Input() item;

  constructor(private router: Router,
              private basketService: BasketService,
              private toasterService: ToasterService,
              private auth: Auth) {
  }

  addItem(item) {
    if (this.auth.authenticated()) {
      this.basketService.addItem(item);
      if (this.auth.userProfile.toasts.info)
        this.toasterService.pop('info', 'Add', 'id-' + item.id + ' ' + item.type);
    }
  }

  goToDetail(item) {
    switch (item.type) {
      case 'movie': {
        this.router.navigate(['product'], {queryParams: {'type': item.type, id: item.id}});
        break;
      }
    }
  }
}
