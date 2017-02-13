import {Component, OnInit} from '@angular/core';
import {GamesService} from "../shared/services/games.service";
import {MoviesService} from "../shared/services/movies.service";
import {ToasterService} from 'angular2-toaster';


@Component({
  moduleId: module.id,
  selector: 'main-page',
  templateUrl: 'main-page.component.html'
})
export class MainPageComponent implements OnInit {
  private resentlyGames = [];
  private nowPlayingMovies = [];

  constructor(private gamesService: GamesService,
              private moviesService: MoviesService) {
  }


  ngOnInit() {
    /*this.gamesService.getNewGames()
     .subscribe(games => this.resentlyGames = games);*/

    this.moviesService.getNowPlayingMovies()
      .subscribe(movies => {
        this.nowPlayingMovies = this.moviesService.generateMovies(movies);
      });
  }
}
