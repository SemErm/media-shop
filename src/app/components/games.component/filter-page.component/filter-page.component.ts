import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GamesService} from '../../../services/games.service';
import * as _ from 'lodash';


@Component({
  selector: 'search-page',
  templateUrl: 'filter-page.component.html',
  styleUrls: ['filter-page.component.css'],
  providers: [GamesService]
})
export class SearchPageComponent implements OnInit {

  constructor(private gamesService: GamesService,
              private router: Router) {
  }
  ngOnInit(){

  }

  goToDetail(game: any) {
    this.router.navigate(['games/detail', game.id]);
  }
}
