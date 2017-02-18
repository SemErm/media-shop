import {Injectable, EventEmitter} from "@angular/core";
import {tokenNotExpired} from "angular2-jwt";
import * as _ from "lodash";
import {BasketService} from "./basket.service";
import {Router} from "@angular/router";
import {ToasterService} from "angular2-toaster";

declare let Auth0Lock: any;

@Injectable()
export class Auth {

  lock = new Auth0Lock('mE3OiNnVmSxRHB6ecJiZbCKlUC1IPeLu', 'semerm.auth0.com', {});

  userProfile: any;
  profiles = [];
  auth = new EventEmitter();

  constructor(private basketService: BasketService,
              private router: Router,
              private toasterService: ToasterService) {

    if (localStorage.getItem('profiles')) {
      this.profiles = JSON.parse(localStorage.getItem('profiles'));
    }

    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          alert(error);
          return;
        }

        if (!_.find(this.profiles, (item) => item.clientID === profile.clientID)) {
          this.profiles.push(profile);
          this.userProfile = profile;
          this.userProfile['toasts'] = {
            info: true,
            warning: true,
            success: true
          };
          this.userProfile['basket'] = this.basketService.getBasket(this.userProfile.clientID);
          this.userProfile['addresses'] = [];
          this.userProfile['currency'] = 'dollar';
          localStorage.setItem('profiles', JSON.stringify(this.profiles));
        } else {
          this.userProfile = _.find(this.profiles, (item) => item.clientID === profile.clientID);
          this.userProfile['basket'] = this.basketService.getBasket(this.userProfile.clientID);
        }
      });
    });
  }

  checkProfile() {
    if (localStorage.getItem('id_token')) {
      this.lock.getProfile(localStorage.getItem('id_token'), (error, profile) => {
        if (error) {
          alert(error);
          return;
        }
        if (this.userProfile = _.find(this.profiles, (item) => {
            return item.clientID === profile.clientID
          }))
          this.userProfile['basket'] = this.basketService.getBasket(this.userProfile.clientID);
        this.auth.emit(true);
      })
    }
  }

  addAdreess(address) {
    this.userProfile.addresses.push(address);
    this.updateProfile(this.userProfile);
  }

  removeAddress(address) {
    this.userProfile.addresses = _.remove(this.userProfile.addresses, (item) => {
      return item !== address;
    });
    this.updateProfile(this.userProfile);
  }

  updateProfile(profile) {
    if (this.profiles = _.remove(this.profiles, (item) => {
        return item.clientID !== profile.clientID
      })) {
      this.profiles.push(profile);
      localStorage.setItem('profiles', JSON.stringify(this.profiles));
    }
  }

  public login() {
    this.lock.show();
  }

  public authenticated() {
    return tokenNotExpired();
  }

  public logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['/']);
    this.userProfile = undefined;
    this.basketService.currentBasket = undefined;
  }
}
