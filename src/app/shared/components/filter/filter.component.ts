import {Component, OnInit, Input} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {GamesService} from "../../services/games.service";
import {MoviesService} from "../../services/movies.service";
import {MusicsService} from "../../services/musics.service";


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
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.search = this.nameFilter === 'all' ? true : false;
    this.changeTypes(this.nameFilter);

    this.filterForm = this.fb.group({
      type: [this.nameFilter],
      dateTo: [],
      dateFrom: [],
      genres: [],
      gameMode: []
    });

    this.route.params
      .subscribe((params: any) => {
        this.filterForm.controls['type'].setValue(params.category);
        this.changeTypes(params.category)
      });

    this.filterForm.valueChanges
      .subscribe(formFilter => {
        if (!this.search) return;
        this.nameFilter = formFilter.type;
        this.changeTypes(formFilter.type)
      });


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
      case 'musics': {
        this.genres = this.musicsService.getGenres();
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
    this.router.navigate([`/category/${this.nameFilter}/filter`], {queryParams: filter});
  }

  onReset() {
    this.router.navigate([this.nameFilter]);
  }

}
