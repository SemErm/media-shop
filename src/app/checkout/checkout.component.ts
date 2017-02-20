import { Component, OnInit } from "@angular/core";
import { Auth } from "../shared/services/auth.service";
import { BasketService } from "../shared/services/basket.service";
import { ModalWindowComponent } from "../shared/components/modal-window.component/modal-window.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as _ from "lodash";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { ConfirmationComponent } from "./confirmation.component";

@Component({
  moduleId: module.id,
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  private order = {};
  private priceByCategory = {
    'movies': {},
    'musics': {},
    'games': {}
  };
  private listCurrency = ["PayPal", "CreditCard", "Cash", "WebMoney", "QIWI", "Bitcoin"];
  private promo;
  private inputPromo: FormGroup;
  private message: string;

  constructor(private auth: Auth,
              private basketService: BasketService,
              private modalService: NgbModal,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.inputPromo = this.fb.group({
      promo: [''],
      button: ['Enter promo'],
      order: ['Pay'],
      currency: [this.listCurrency[0]],
      message: ['']
    });
    this.auth.auth
      .subscribe(() => {
        this.onDisplay();
      });
    if (this.auth.userProfile) {
      this.onDisplay();
    }
  }

  onDisplay() {

    this.order['basket'] = this.basketService.getItems();
    let count_item;

    this.priceByCategory.movies['price'] = _.sumBy(this.order['basket'], (item) => {
        if (item.type === 'movie') return +item.price;
      }) || 0;

    count_item = _.filter(this.order['basket'], (item) => {
      return item.type === 'movie';
    });

    this.priceByCategory.movies['count'] = count_item ? count_item.length : 0;

    this.priceByCategory.games['price'] = _.sumBy(this.order['basket'], (item) => {
        if (item.type === 'game')return +item.price;
      }) || 0;

    count_item = _.filter(this.order['basket'], (item) => {
      return item.type === 'game';
    });

    this.priceByCategory.games['count'] = count_item ? count_item.length : 0;

    this.priceByCategory.musics['price'] = _.sumBy(this.order['basket'], (item) => {
        if (item.type === 'album' || item.type === 'artist')return +item.price;
      }) || 0;

    count_item = _.filter(this.order['basket'], (item) => {
      return item.type === 'album' || item.type === 'artist';
    });

    this.priceByCategory.musics['count'] = count_item ? count_item.length : 0;

    this.order['price'] = this.priceByCategory.musics['price'] +
      this.priceByCategory.games['price'] +
      this.priceByCategory.movies['price'];

  }

  open() {
    this.modalService.open(ModalWindowComponent);
  }

  onPay() {
    if (!this.order['address']) {
      this.message = 'Address is not selected';
      return;
    }
    if (this.inputPromo.controls['currency'].value === 'Currency') {
      this.message = 'Currency is not selected';
      return;
    }
    this.message = '';
    this.order['currency'] = this.inputPromo.controls['currency'].value;
    Observable.of(this.order)
      .delay(5000)
      .subscribe(res => {
        const modalRef = this.modalService.open(ConfirmationComponent);
        modalRef.componentInstance.order = res;
        this.basketService.deleteItems();
      });
  }

  checkPromo() {
    if (this.promo) {
      this.message = 'Promo code has already been activated';
      return;
    }
    else {
      if (this.inputPromo.controls['promo'].value === 'ANGULAR2') {
        for (let key of Object.keys(this.priceByCategory)) {
          this.priceByCategory[key].price *= 0.75;
        }
        this.promo = true;
        this.order['price'] *= 0.75;
        this.message = '';
      }
      else {
        this.message = 'Promo code is invalid';
      }
    }

  }

  submitCurrency(cur) {
    this.inputPromo.controls['currency'].setValue(cur);
  }

  onChooseAddress(address) {
    this.order['address'] = address;
  }
}
