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
  private search: boolean = false;
  private filterForm: FormGroup;
  private genres = [];
  private gameModes = [];
  private types = ['movies', 'musics', 'games'];

  constructor(private gamesService: GamesService,
              private moviesService: MoviesService,
              private musicsService: MusicsService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.search = this.nameFilter === 'all';
    this.changeTypes(this.nameFilter);
    switch (this.nameFilter) {
      case 'movies': {
        this.filterForm = this.fb.group({
          genres: new FormControl(),
          dateTo: new FormControl(),
          dateFrom: new FormControl()
        });
        break;
      }
      case 'musics': {
        this.filterForm = this.fb.group({
          genres: new FormControl(),
          dateFrom: new FormControl(),
          dateTo: new FormControl()
        });
        break;
      }
      case 'games': {
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
          type: new FormControl(),
          genres: new FormControl(),
          dateTo: new FormControl(),
          dateFrom: new FormControl(),
          gameMode: new FormControl()
        });
        break;
      }
    }
  }

  changeTypes(type) {
    switch (type) {
      case 'movies': {
        this.moviesService.getGenres()
          .subscribe(genres => {
            this.genres = genres;
          });
        break;
      }
      case 'musics':{
        this.genres = this.musicsService.getGenres();
        break;
      }
      case 'games':{
        this.gamesService.getGenres()
          .subscribe(genres => {
            this.genres = genres;
          });
        this.gamesService.getGameModes()
          .subscribe(gameMode => {
            this.gameModes = gameMode;
          });
        break;
      }
    }
  }

  filterPage() {
    let filter: any = {};
    filter['type'] = this.nameFilter === 'all' ? this.filterForm.value['type'] : this.nameFilter;
    for (let val of Object.keys(this.filterForm.value)) {
      filter[val] = this.filterForm.value[val];
    }
    this.router.navigate([`${filter['type']}/filter`], {queryParams: filter});
  }

  onReset() {
    this.filterForm.reset();
    this.router.navigate([this.nameFilter]);
  }

}
