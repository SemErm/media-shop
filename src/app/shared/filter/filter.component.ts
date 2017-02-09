import {Component, OnInit, Input} from '@angular/core';
import {GamesService} from "../services/games.service";
import {MoviesService} from "../services/movies.service";
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";


@Component({
  moduleId: module.id,
  selector: 'filter',
  templateUrl: 'filter.component.html'
})
export class FilterComponent implements OnInit {
  @Input() nameFilter;
  private filterForm: FormGroup;
  private genres =[];
  constructor(private _gamesService: GamesService,
              private _moviesService: MoviesService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this._moviesService.getGenres()
      .subscribe(res => {
        this.genres = res;
        console.log(this.genres);
      });

    switch (this.nameFilter) {
      case 'movies': {
        this.filterForm = this.fb.group({
          genres: new FormControl(),
          dateTo: new FormControl(),
          dateFrom: new FormControl(),
          vote: new FormControl(),
          name: new FormControl()
        });
        break;
      }
    }
  }

  filter(){

  }

}
