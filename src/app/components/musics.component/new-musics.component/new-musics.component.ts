import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MusicsService} from '../../../services/musics.service';


@Component({
  moduleId: module.id,
  selector: 'new-musics',
  templateUrl: './new-musics.component.html',
  styleUrls: ['./new-musics.component.css'],
  providers: [MusicsService]
})
export class NewMusicsComponent implements OnInit {
  private musics: Array<any>;
  private connect: any;

  constructor(private musicsService: MusicsService,
              private router: Router) {
  }

  ngOnInit() {


    /*this.musicsService.getNewReleases()
      .subscribe(moviesArray => {
        this.musics = moviesArray;
        console.log(this.musics);
      });*/
  }

  goToDetail(music: any) {
    this.router.navigate(['music/detail', music.id]);
  }

}
