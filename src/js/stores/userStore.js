import {observable, action} from 'mobx';
import {isEmpty} from 'lodash';

import usersAPI from '../lib/api/users';

const FB = window.FB;

class Store {

  @observable user = []
  @observable friends = []
  @observable fbid = ``

  init = () => {
    FB ? FB.getLoginStatus(response => response.status === `connected` ? this.saveUser(response.authResponse) : console.log(`not logged in`)) : this.init();
  }

  constructor() {
    this.init();
  }

  @action login = () => {
    FB.login(response => {
      response.status === `connected` ? this.signUp(response.authResponse) : console.error(`something went wrong`);
    }, {scope: `public_profile, email, user_friends`});
  }

  @action saveUser = ({userID}) => {
    usersAPI.read(userID)
      .then(user => {
        this.user = user[0];
        this.setFbId(userID);
        this.getFriends();
      });
  }

  @action setFbId = id => this.fbid = id;


  signUp = ({userID}) => {
    this.setFbId(userID);
    usersAPI.read(userID)
      .then(user => {
        if (isEmpty(user)) {
          FB.api(`/${userID}`, {fields: `id, email, first_name, last_name`}, response => this.insert(response));
        } else {
          this.saveUser(userID);
        }
      });
  }

  insert = res => {
    res.firstName = res.first_name;
    res.lastName = res.last_name;

    usersAPI.create(res)
      .then(user => {
        console.log(user);
        this.user = user;
        this.getFriends();
      });
  }

  getFriends = () => {
    FB.api(`/${this.fbid}/friends`, response => {
      response.data.forEach(f => this.friends.push(f));
    });
    return this.friends;
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
