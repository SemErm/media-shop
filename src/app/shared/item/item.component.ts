import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {BasketService} from "../services/basket.service";
@Component({
  moduleId: module.id,
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent {
  @Input() item;

  constructor(private router: Router,
              private cartService: BasketService) {
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
