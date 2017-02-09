import {Component, OnInit, Input} from '@angular/core';
import {GamesService} from "../services/games.service";
import {MoviesService} from "../services/movies.service";
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";


@Component({
  moduleId: module.id,
  selector: 'filter',
  templateUrl: 'filter.component.html'
})
export class FilterComponent implements OnInit {
  @Input() nameFilter;
  private filterForm: FormGroup;
  private genres = [];

  constructor(private _gamesService: GamesService,
              private _moviesService: MoviesService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this._moviesService.getGenres()
      .subscribe(res => {
        this.genres = res;
      });

    switch (this.nameFilter) {
      case 'movies': {
        this.filterForm = this.fb.group({
          genres: new FormControl(),
          dateTo: new FormControl(),
          dateFrom: new FormControl()
        });
        break;
      }
    }
  }

  filterPage() {
    let filter: any = {};
    switch (this.nameFilter) {
      case 'movies': {
        for (let val of Object.keys(this.filterForm.value)) {
          if (val === 'genres') filter['with_genres'] = this.filterForm.value[val];
          if (val === 'dateTo') filter['primary_release_date.lte'] = this.filterForm.value[val];
          if (val === 'dateFrom') filter['primary_release_date.gte'] = this.filterForm.value[val];
        }
        this.router.navigate(['movies/filter'], {queryParams: {filter: this.nameFilter}});
        this._moviesService.getMoviesByFilter(filter);
        break;
      }
    }

  }

}
