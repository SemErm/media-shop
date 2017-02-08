import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GamesService} from '../../../services/games.service';

import * as _ from 'lodash';
import {ProfileService} from "../../../services/profile.service";

interface sectionGenre {
  id: number;
  name: string;
  games: Object[];
}

@Component({
  selector: 'start-page',
  templateUrl: 'start-page.component.html',
  styleUrls: ['start-page.component.css'],
  providers: [GamesService, ProfileService]
})
export class StartPageComponent implements OnInit {
  private randomGenres: sectionGenre[] = [];
  private resentlyGames: Array<any>;
  private currentRate: number;

  constructor(private gamesService: GamesService,
              private profileService: ProfileService,
              private router: Router) {
  }

  setRandomGenres() {
    const NUMBER_GENRES = 3;
    let tmpGenres: any;
    this.gamesService.getGenres()
      .subscribe(res => {
        tmpGenres = res;
        for (let i = 0; i < NUMBER_GENRES; i++) {
          let random = _.random(0, tmpGenres.length - 1);
          let newSectionGenre: any = {};
          newSectionGenre.name = tmpGenres[random].name;
          let listGames = tmpGenres[random].games.slice(0, 6);
          newSectionGenre.games = [];
          for (let id of listGames) {
            this.gamesService.getGame(+id)
              .subscribe(res => {
                newSectionGenre.games.push(res);
              });
          }
          this.randomGenres.push(newSectionGenre);
          tmpGenres = _.remove(tmpGenres, (item) => {
            return _.last(this.randomGenres) !== item.name;
          });
        }
      });
  }

  ngOnInit() {
    /*this.profileService.getCurruntRate()
      .subscribe(rate => this.currentRate = rate);

    this.gamesService.getNewGames()
      .subscribe(games => this.resentlyGames = games);

    this.setRandomGenres();*/
  }

}
