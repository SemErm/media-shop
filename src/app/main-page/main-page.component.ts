import {Component, OnInit} from "@angular/core";
import {GamesService} from "../shared/services/games.service";
import {MoviesService} from "../shared/services/movies.service";
import 'rxjs/add/operator/map'
import {Product} from "../product/product";


@Component({
  moduleId: module.id,
  selector: 'main-page',
  templateUrl: 'main-page.component.html'
})
export class MainPageComponent implements OnInit {
  private resentlyGames = [];
  private nowPlayingMovies: Product[] = [];

  constructor(private gamesService: GamesService,
              private moviesService: MoviesService) {
  }


  ngOnInit() {
    /*this.gamesService.getNewGames()
     .subscribe(games => this.resentlyGames = games);*/

    this.moviesService.getNowPlayingMovies()
      .subscribe(movies => {
        this.nowPlayingMovies = movies.map(movie=>{
          return this.moviesService.generateMovie(movie)
        });
      });
  }
}
