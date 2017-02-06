import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GamesService} from '../../../services/games.service';

@Component({
  moduleId: module.id,
  selector: 'new-games',
  templateUrl: './new-games.component.html',
  styleUrls: ['./new-games.component.css'],
  providers: [GamesService]
})
export class NewGamesComponent implements OnInit {
  private games: any;
  private pathImage = 'https://images.igdb.com/igdb/image/upload/t_cover_big/';
  private pathNoImage = '../../../../no-image.png';

  constructor(private gamesService: GamesService,
              private router: Router) {
  }

  ngOnInit() {

    this.gamesService.getNewGames()
      .subscribe(games => {
        this.games = games;
      });
  }

  goToDetail(game: any) {
    this.router.navigate(['games/detail', game.id]);
  }

}
