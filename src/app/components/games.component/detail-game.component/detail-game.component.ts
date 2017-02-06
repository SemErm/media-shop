import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {GamesService} from '../../../services/games.service'

import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'detail-game',
  templateUrl: './detail-game.component.html',
  styleUrls: ['./detail-game.component.css'],
  providers: [GamesService]
})
export class DetailGameComponent implements OnInit {
  private game: any;
  private pathImage = 'https://images.igdb.com/igdb/image/upload/t_cover_big/';
  private pathNoImage = '../../../../no-image.png';

  constructor(private gamesService: GamesService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.gamesService.getGame(+params['id']))
      .subscribe(game => {
        this.game = game;
        if (game.developers) {
          this.gamesService.getDevelopers(game.developers).subscribe(res => game.developers = res);
        }
        this.gamesService.getNameGenre(game.genres)
          .subscribe(res => game.genres = res);
      });
  }

  goBack() {
    this.location.back();
  }
}
