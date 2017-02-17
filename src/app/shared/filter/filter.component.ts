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
  private gameModes = [];

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
        this.gamesService.getGameModes()
          .subscribe(gameMode => {
            this.gameModes = gameMode;
          });
        this.filterForm = this.fb.group({
          genres: new FormControl(),
          dateTo: new FormControl(),
          dateFrom: new FormControl(),
          gameMode: new FormControl()
        });
        break;
      }
      default: {
        this.filterForm = this.fb.group({
          genres: new FormControl(),
          dateTo: new FormControl(),
          dateFrom: new FormControl(),
          gameMode: new FormControl()
        });
        break;
      }
    }
  }

  filterPage() {
    let filter: any = {};
    filter['type'] = this.nameFilter;
    for (let val of Object.keys(this.filterForm.value)) {
      filter[val] = this.filterForm.value[val];
    }
    this.router.navigate([`${this.nameFilter}/filter`], {queryParams: filter});
  }

  onReset() {
    this.filterForm.reset();
    this.router.navigate([this.nameFilter]);
  }

}
