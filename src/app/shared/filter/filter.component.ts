import {Component, OnInit, Input} from "@angular/core";
import {GamesService} from "../services/games.service";
import {MoviesService} from "../services/movies.service";
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {MusicsService} from "../services/musics.service";


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
              private musicsService: MusicsService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    switch (this.nameFilter) {
      case 'movies': {
        this.moviesService.getGenres()
          .subscribe(res => {
            this.genres = res;
          });
        this.filterForm = this.fb.group({
          genres: new FormControl(),
          dateTo: new FormControl(),
          dateFrom: new FormControl()
        });
        break;
      }
      case 'musics': {
        this.genres = this.musicsService.getGenres();
        this.filterForm = this.fb.group({
          genres: new FormControl(),
          dateFrom: new FormControl(),
          dateTo: new FormControl()
        });
        break;
      }
      case 'games': {
        this.gamesService.getGenres()
          .subscribe(genres => {
            this.genres = genres;
          });
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
        filter['type'] = this.nameFilter;
        for (let val of Object.keys(this.filterForm.value)) {
          filter[val] = this.filterForm.value[val];
        }
        this.router.navigate(['movies/filter'], {queryParams: filter});
        break;
      }
      case 'games': {
        filter['type'] = this.nameFilter;
        for (let val of Object.keys(this.filterForm.value)) {
          filter[val] = this.filterForm.value[val];
        }
        this.router.navigate(['games/filter'], {queryParams: filter});
        break;
      }
      case 'musics':{
        filter['type'] = this.nameFilter;
        for (let val of Object.keys(this.filterForm.value)) {
          filter[val] = this.filterForm.value[val];
        }
        this.router.navigate(['musics/filter'], {queryParams: filter});
        break;
      }
    }

  }

  onReset() {
    this.filterForm.reset();
    this.router.navigate([this.nameFilter]);
  }

}
