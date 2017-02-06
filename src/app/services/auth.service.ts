import {Injectable}      from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import {myConfig}        from '../auth.config';

// Avoid name not found warnings
declare let Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  public lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {});

  constructor() {

    console.log(myConfig.clientID, myConfig.domain);
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  };
}
