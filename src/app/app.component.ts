import {Component, OnInit} from "@angular/core";
import {Auth} from "./shared/services/auth.service";
import {BasketService} from "./shared/services/basket.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private query: string;

  constructor(private auth: Auth,
              private basket: BasketService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.auth.checkProfile();
  }

  search() {
    let type = this.route.snapshot.queryParams['type'] || this.router.url.split('/')[2] || 'all';
    this.router.navigate(['/search'], {queryParams: {'query': this.query, 'type': type}});
    this.query = '';
  }

}
