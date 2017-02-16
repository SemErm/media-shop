import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {MoviesService} from "../shared/services/movies.service";
import {BasketService} from "../shared/services/basket.service";
import {Product} from "./product";
import {GamesService} from "../shared/services/games.service";
import {MusicsService} from "../shared/services/musics.service";

@Component({
  moduleId: module.id,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {

  private product: Product;

  constructor(private moviesService: MoviesService,
              private gamesService: GamesService,
              private musicService: MusicsService,
              private route: ActivatedRoute,
              private location: Location,
              private basket: BasketService) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        switch (params['type']) {
          case 'movie': {
            this.moviesService.getMovie(params['id'])
              .subscribe(movie => {
                this.product = this.moviesService.generateMovie(movie);
                console.log(this.product);
              });
            break;
          }
          case 'game': {
            this.gamesService.getGame(params['id'])
              .subscribe(game => {
                this.product = this.gamesService.generateGame(game);
                console.log(this.product);
              });
            break;
          }
          case 'music': {
            this.musicService.getAlbum(params['id'])
              .subscribe(music => {
                this.product = this.musicService.generateMusic(music);
                console.log(this.product);
              });
            break;
          }
        }
      })
  }

  goBack() {
    this.location.back();
  }
}
