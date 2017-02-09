import {Component, OnInit} from '@angular/core';
import {GamesService} from "../shared/services/games.service";
import {MoviesService} from "../shared/services/movies.service";


@Component({
  moduleId: module.id,
  selector: 'main-page',
  templateUrl: 'main-page.component.html'
})
export class MainPageComponent implements OnInit {
  private resentlyGames = [];
  private nowPlayingMovies = [];
  private pathImage = 'https://image.tmdb.org/t/p/w500/';

  constructor(private _gamesService: GamesService,
              private _moviesService: MoviesService) {
  }

  generateMovies(movies) {
    return movies.map(movie => {
      return {
        id: movie.id,
        name: movie.title,
        poster: this.pathImage + movie.poster_path,
        price: (movie.vote_average * 5.5).toFixed(2)
      }
    });
  }

  ngOnInit() {
    /*this.gamesService.getNewGames()
     .subscribe(games => this.resentlyGames = games);*/

    this._moviesService.getNowPlayingMovies()
      .subscribe(movies => {
        this.nowPlayingMovies = this.generateMovies(movies);
      });
  }
}
