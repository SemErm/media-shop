import {Component, OnInit} from "@angular/core";
import {MoviesService} from "../services/movies.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import * as _ from "lodash";
import "rxjs/add/operator/map";
import {GamesService} from "../services/games.service";
import {MusicsService} from "../services/musics.service";

@Component({
  moduleId: module.id,
  selector: 'filter-page',
  templateUrl: './filter-page.component.html'
})
export class FilterPageComponent implements OnInit {
  private items = [];
  private subscription: Subscription;

  constructor(private moviesService: MoviesService,
              private gamesService: GamesService,
              private musicsService: MusicsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.queryParams
      .subscribe(params => {
        let filterName = params['type'];
        let filter: any = {};
        switch (filterName) {
          case 'movies': {

            for (let val of Object.keys(params)) {
              if (val === 'genres') filter['with_genres'] = params[val];
              if (val === 'dateTo') filter['primary_release_date.lte'] = params[val];
              if (val === 'dateFrom') filter['primary_release_date.gte'] = params[val];
            }

            this.moviesService.getMoviesByFilter(filter)
              .subscribe(res => {
                this.items = _.chunk(res.map(movie => {
                  return this.moviesService.generateMovie(movie);
                }), 6);
              });
            break;
          }
          case 'games': {
            this.items = [];
            for (let val of Object.keys(params)) {
              if (val === 'genres') filter['filter[genres][eq]'] = params[val];
              if (val === 'dateTo') filter['filter[release_dates.date][lte]'] = params[val];
              if (val === 'dateFrom') filter['filter[release_dates.date][gte]'] = params[val];
              if (val === 'gameMode') filter['filter[game_modes][geq]'] = params[val];
            }
            let games = [];
            this.gamesService.getFilterGame(filter)
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
          case 'musics': {
            let query = `genre:"${params['genres']}"`;
            if (params['dateFrom'] && params['dateTo']) query += `+year:${params['dateFrom'].split('-')[0]}-${params['dateTo'].split('-')[0]}`;
            this.musicsService.getFilterMusic(query)
              .subscribe(musics => {
                this.items = _.chunk(musics.map(music => {
                  return this.musicsService.generateMusic(music);
                }), 6)
              });
            break;
          }
        }

      });
  }
}
