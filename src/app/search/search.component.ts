import {Component, OnInit} from "@angular/core";
import {Subscription, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MoviesService} from "../shared/services/movies.service";
import * as _ from "lodash";
import {MusicsService} from "../shared/services/musics.service";
import {GamesService} from "../shared/services/games.service";
@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit {
  private subscription: Subscription;
  private items = [];
  private type: string;

  constructor(private route: ActivatedRoute,
              private moviesService: MoviesService,
              private musicsService: MusicsService,
              private gamesService: GamesService) {
  }

  ngOnInit() {
    this.subscription = this.route.queryParams
      .subscribe(params => {
        this.type = params['type'];
        switch (this.type) {
          case 'movies': {
            console.log('case movies');
            this.moviesService.gerSearchMovies(params['query'])
              .subscribe(movies => {
                this.items = _.chunk(movies.map(movie => {
                  return this.moviesService.generateMovie(movie);
                }), 6);
              });
            break;
          }
          case 'musics': {
            console.log('case musics');
            this.musicsService.getSearch(params['query'], 'artist', 18)
              .subscribe(musics => {
                this.items = _.chunk(musics.map(music => {
                  return this.musicsService.generateMusic(music);
                }), 6)
              });
            break;
          }
          case 'games': {
            console.log('case games');
            this.items = [];
            this.gamesService.getSearch(params['query'])
              .subscribe(response => {
                let idsGames = _.chunk(response, 6);
                for (let section of idsGames) {
                  let sectionGames = [];
                  for (let idGame of section) {
                    this.gamesService.getGame(idGame.id)
                      .subscribe(game => {
                        sectionGames.push(this.gamesService.generateGame(game));
                      })
                  }
                  this.items.push(sectionGames);
                }
              });
            break;
          }
          default: {
            this.items = [];
            let result = [];
            Observable.forkJoin(
              this.moviesService.gerSearchMovies(params['query']),
              this.musicsService.getSearch(params['query'], 'album', 18),
              this.gamesService.getSearch(params['query'])
            )
              .subscribe(res => {
                this.gamesService.getGames(res[2])
                  .subscribe(games => {
                    result = _.concat(
                      res[0].map(movie => {
                        return this.moviesService.generateMovie(movie);
                      }),
                      res[1].albums.items.map(music => {
                        return this.musicsService.generateMusic(music);
                      }),
                      games.map(game => {
                        return this.gamesService.generateGame(game)
                      })
                    );
                    this.items = _.chunk(result, 6);
                  });
              });
            break;
          }
        }
      });
  }
}
