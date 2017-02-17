import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
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
            this.moviesService.gerSearchMovies(params['query'])
              .subscribe(movies => {
                this.items = _.chunk(movies.map(movie => {
                  return this.moviesService.generateMovie(movie);
                }), 6);
              });
            break;
          }
          case 'musics': {
            this.musicsService.getSearch(params['query'])
              .subscribe(musics => {
                this.items = _.chunk(musics.map(music => {
                  return this.musicsService.generateMusic(music);
                }), 6)
              });
            break;
          }
          case 'games': {
            this.items = [];
            let games = [];
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

            break;
          }
        }
      });
  }
}
