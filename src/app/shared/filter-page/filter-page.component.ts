import {Component, OnInit} from "@angular/core";
import {MoviesService} from "../services/movies.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import * as _ from 'lodash';
@Component({
  moduleId: module.id,
  selector: 'filter-page',
  templateUrl: './filter-page.component.html'
})
export class FilterPageComponent implements OnInit {
  private pathImage = 'https://image.tmdb.org/t/p/w500/';
  private items = [];
  private subscription: Subscription;

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
    let filterName = this.route.snapshot.queryParams['filter'];
    switch (filterName) {
      case 'movies': {
        this.subscription = this.moviesService.updateSource$
          .subscribe(res => {
            this.items = _.chunk(this.generateMovies(res), 6);
          });
        break;
      }
    }

  }
}
