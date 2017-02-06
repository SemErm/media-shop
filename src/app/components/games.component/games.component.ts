import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GamesService} from '../../services/games.service';

import * as _ from 'lodash';

interface sectionGenre {
  id: number;
  name: string;
  games: Object[];
}

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  providers: [GamesService]
})
export class GamesComponent implements OnInit {
  private randomGenres: sectionGenre[] = [];
  private pathImage = 'https://images.igdb.com/igdb/image/upload/t_cover_big/';
  private pathNoImage = '../../../../no-image.png';

  constructor(private gamesService: GamesService,
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
    this.setRandomGenres();
  }

  goToDetail(game: any) {
    this.router.navigate(['games/detail', game.id]);
  }
}
