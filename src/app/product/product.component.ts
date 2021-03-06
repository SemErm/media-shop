import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { MoviesService } from "../shared/services/movies.service";
import { BasketService } from "../shared/services/basket.service";
import { Product } from "./product";
import { GamesService } from "../shared/services/games.service";
import { MusicsService } from "../shared/services/musics.service";
import { Auth } from "../shared/services/auth.service";
import { ToasterService } from "angular2-toaster";

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
              private basket: BasketService,
              private auth: Auth,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        switch (params['type']) {
          case 'movie': {
            this.moviesService.getMovie(params['id'])
              .subscribe(movie => {
                this.product = this.moviesService.generateMovie(movie);
              });
            break;
          }
          case 'game': {
            this.gamesService.getGame(params['id'])
              .subscribe(game => {
                this.product = this.gamesService.generateGame(game);
                this.product.genres = this.gamesService.getNameGenres(this.product.genres);
              });
            break;
          }
          case 'album': {
            this.musicService.getAlbum(params['id'])
              .subscribe(album => {
                this.product = this.musicService.generateMusic(album);
                this.musicService.getAlbumTracks(params['id'])
                  .subscribe(tracks => {
                    this.product.tracks = tracks;
                  });
              });
            break;
          }
          case 'artist': {
            this.musicService.getArtist(params['id'])
              .subscribe(artist => {
                this.product = this.musicService.generateMusic(artist);
                this.musicService.getTopTracks(params['id'])
                  .subscribe(tracks => {
                    this.product.tracks = tracks;
                  });
              });
            break;
          }
        }
      })
  }

  goBack() {
    this.location.back();
  }

  addItem(item) {
    this.basket.addItem(item);
    if (this.auth.userProfile.toasts.info)
      this.toasterService.pop('info', 'Add', `${item.name} ${item.type}`);
  }
}
