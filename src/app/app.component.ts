import { Component, OnInit } from "@angular/core";
import { Auth } from "./shared/services/auth.service";
import { BasketService } from "./shared/services/basket.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private query: string;
  private searchForm: FormGroup;

  constructor(private auth: Auth,
              private basket: BasketService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.auth.checkProfile();
    this.searchForm = this.fb.group({
      fieldSearch: ['', Validators.required],
      button: ['Search']
    });
    this.searchForm.valueChanges
      .subscribe(form => {
        this.query = form.fieldSearch;
      })
  }

  search() {
    let type = this.route.snapshot.queryParams['type'] || this.router.url.split('/')[2] || 'all';
    this.router.navigate(['/search'], {queryParams: {'query': this.query, 'type': type}});
    this.query = '';
  }

}
