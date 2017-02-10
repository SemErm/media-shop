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

  constructor(private gamesService: GamesService,
              private moviesService: MoviesService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.moviesService.getGenres()
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
        filter['filter'] = this.nameFilter;
        for (let val of Object.keys(this.filterForm.value)) {
          filter[val] = this.filterForm.value[val];
        }
        this.router.navigate(['movies/filter'], {queryParams: filter});
        break;
      }
    }

  }

}
