import {Injectable}      from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import * as _ from 'lodash';

declare let Auth0Lock: any;

@Injectable()
export class Auth {

  lock = new Auth0Lock('mE3OiNnVmSxRHB6ecJiZbCKlUC1IPeLu', 'semerm.auth0.com', {});

  userProfile: any;
  profiles = [];

  constructor() {

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
          localStorage.setItem('profiles', JSON.stringify(this.profiles));
        } else {
          this.userProfile = _.find(this.profiles, (item) => item.clientID === profile.clientID);
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
        this.userProfile = _.find(this.profiles, (item) => item.clientID === profile.clientID);
      })
    }
  }

  updateProfile(profile: any) {
    if(_.remove(this.profiles, (item) => item.clientID === profile.clientID)) {
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
    this.userProfile = undefined;
  }
}
