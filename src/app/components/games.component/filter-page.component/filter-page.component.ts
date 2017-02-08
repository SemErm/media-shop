import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GamesService} from '../../../services/games.service';
import * as _ from "lodash";


@Component({
  selector: 'search-page',
  templateUrl: 'filter-page.component.html',
  styleUrls: ['filter-page.component.css'],
  providers: [GamesService]
})
export class FilterPageComponent implements OnInit {
  private filterGames: any[] = [];

  constructor(private gamesService: GamesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  showFilterGames(params: any) {
    this.gamesService.getFilterGame(params)
      .subscribe(games => {
        this.filterGames = _.chunk(games, 6);
        for (let masIndex = 0; masIndex < this.filterGames.length; masIndex++) {
          for (let gameIndex = 0; gameIndex < this.filterGames[masIndex].length;gameIndex++) {
            this.gamesService.getGame(this.filterGames[masIndex][gameIndex].id)
              .subscribe(res => this.filterGames[masIndex][gameIndex] = res);
          }
        }
        console.log(this.filterGames);
      });
  }

  ngOnInit() {
    /*this.route
      .queryParams
      .subscribe(params => this.showFilterGames(params));*/
  }

  goToDetail(game: any) {
    this.router.navigate(['games/detail', game.id]);
  }
}
