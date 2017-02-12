import {Component, OnInit} from '@angular/core';
import {Auth} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private auth: Auth) {
  }

  ngOnInit(){
    this.auth.checkProfile();
  }
}
