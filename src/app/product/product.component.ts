import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {MoviesService} from "../shared/services/movies.service";
import {BasketService} from "../shared/services/basket.service";
import {Product} from "./product";

@Component({
  moduleId: module.id,
  templateUrl: './product.component.html',
  styleUrls:['./product.component.css']
})

export class ProductComponent {

  private product :Product;

  constructor(private moviesService: MoviesService,
              private route: ActivatedRoute,
              private location: Location,
              private basket: BasketService) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        switch (params['type']) {
          case 'movie': {
            this.moviesService.getMovie(params['id'])
              .subscribe(movie => {
                this.product = this.moviesService.generateMovie(movie);
              });
            break;
          }
        }
      });
  }

  goBack() {
    this.location.back();
  }
}
