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
  private items = [];
  private subscription: Subscription;

  constructor(private moviesService: MoviesService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.queryParams
      .subscribe(params => {
        let filterName = params['filter'];
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
                this.items = _.chunk(this.moviesService.generateMovies(res), 6);
              });
            break;
          }
        }

      });
  }
}
