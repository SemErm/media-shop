import {Component, OnInit, Input} from '@angular/core';
import {GamesService} from "../services/games.service";
import {MoviesService} from "../services/movies.service";
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {URLSearchParams} from "@angular/http";


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
    switch (this.nameFilter) {
      case 'movies': {
        let params = {nameFilter: this.nameFilter};
        for (let val of Object.keys(this.filterForm.value)) {
          params[val]= this.filterForm.value[val];
        }
        console.log(params);
        this.router.navigate(['movies/filter'], {queryParams: params});
        break;
      }
    }

  }

}
