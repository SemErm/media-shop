import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {MusicsService} from '../../../services/musics.service';
import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'detail-music',
  templateUrl: './detail-music.component.html',
  styleUrls: ['./detail-music.component.css'],
  providers: [MusicsService]
})
export class DetailMusicComponent implements OnInit {
  private music: Object;

  constructor(private musicsService: MusicsService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.musicsService.getAlbum(+params['id']))
      .subscribe(music => {
        this.music = music;
        console.log(this.music);
      });
  }

  goBack(){
    this.location.back();
  }
}
