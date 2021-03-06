import { Component, OnInit } from "@angular/core";
import { GamesService } from "../shared/services/games.service";
import { MoviesService } from "../shared/services/movies.service";
import "rxjs/add/operator/map";
import { MusicsService } from "../shared/services/musics.service";
import { Auth } from "../shared/services/auth.service";

@Component({
  moduleId: module.id,
  selector: 'main-page',
  templateUrl: 'main-page.component.html'
})
export class MainPageComponent implements OnInit {
  private recentlyGames = [];
  private nowPlayingMovies = [];
  private newReleasesMusics = [];

  constructor(private gamesService: GamesService,
              private moviesService: MoviesService,
              private musicService: MusicsService,
              private auth: Auth) {
  }

  ngOnInit() {
    this.auth.auth
      .subscribe(() => {
        this.gamesService.getNewGames()
          .subscribe(games => {
            this.recentlyGames = games.map(game => {
              return this.gamesService.generateGame(game)
            });
          });

        this.moviesService.getNowPlayingMovies()
          .subscribe(movies => {
            this.nowPlayingMovies = movies.map(movie => {
              return this.moviesService.generateMovie(movie)
            });
          });

        this.musicService.getNewReleases()
          .subscribe(musics => {
            this.newReleasesMusics = musics.map(music => {
              return this.musicService.generateMusic(music)
            })
          });
      });
    this.gamesService.getNewGames()
      .subscribe(games => {
        this.recentlyGames = games.map(game => {
          return this.gamesService.generateGame(game)
        });
      });

    this.moviesService.getNowPlayingMovies()
      .subscribe(movies => {
        this.nowPlayingMovies = movies.map(movie => {
          return this.moviesService.generateMovie(movie)
        });
      });

    this.musicService.getNewReleases()
      .subscribe(musics => {
        this.newReleasesMusics = musics.map(music => {
          return this.musicService.generateMusic(music)
        })
      });
  }
}
