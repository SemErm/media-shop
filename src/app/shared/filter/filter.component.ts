import {Component, OnInit} from '@angular/core';
import {GamesService} from "../services/games.service";
import {MoviesService} from "../services/movies.service";


@Component({
  moduleId: module.id,
  selector: 'filter',
  templateUrl: 'filter.component.html'
})
export class FilterComponent implements OnInit{

  constructor(private _gamesService: GamesService,
              private _moviesService: MoviesService) {
  }

  ngOnInit() {

  }
}
