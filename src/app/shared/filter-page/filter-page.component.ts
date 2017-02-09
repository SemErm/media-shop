import {Component, OnInit} from "@angular/core";
import {MoviesService} from "../services/movies.service";
import {ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';
@Component({
  moduleId: module.id,
  selector: 'filter-page',
  templateUrl: './filter-page.component.html'
})
export class FilterPageComponent implements OnInit {
  private pathImage = 'https://image.tmdb.org/t/p/w500/';
  private items = [];

  constructor(private moviesService: MoviesService,
              private route: ActivatedRoute) {
  }

  generateMovies(movies) {
    return movies.map(movie => {
      return {
        id: movie.id,
        type: 'movie',
        name: movie.title,
        poster: this.pathImage + movie.poster_path,
        price: (movie.vote_average * 5.5 + 5).toFixed(2)
      }
    });
  }

  ngOnInit() {
    let params = this.route.snapshot.queryParams;
    let filterName = this.route.snapshot.queryParams['nameFilter'];
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
            console.log(res);
            this.items = _.chunk(this.generateMovies(res), 6);
            console.log(this.items);
          });
        break;
      }
    }

  }
}
