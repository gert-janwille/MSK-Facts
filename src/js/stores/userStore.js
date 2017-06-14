import {observable, action} from 'mobx';
import {isEmpty} from 'lodash';

import usersAPI from '../lib/api/users';
import factAPI from '../lib/api/facts';

const FB = window.FB;

class Store {

  @observable user = []
  @observable friends = []
  @observable fbid = ``

  @observable savedFacts = []

  @observable userInvites = [];

  init = () => {
    FB ? FB.getLoginStatus(response => response.status === `connected` ? this.saveUser(response.authResponse) : console.log(`not logged in`)) : setTimeout(() => this.init(), 500);
  }

  constructor() {
    this.init();
  }

  hasRequest = ({invites}) => {
    this.userInvites.clear();

    invites.forEach(invite => {
      usersAPI.read(invite)
        .then(user => this.userInvites.push(user[0]));
    });
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
        this.hasRequest(user[0]);
        this.getFacts(this.user.foundFacts);
      });
      
    this.setFbId(userID);
  }

  @action saveFact = (factId, ac) => {
    if (!this.fbid) return;
    if (!factId) return;

    const contain = this.savedFacts.includes(factId);
    if (contain && ac === `add`) return;

    usersAPI.update(this.fbid, factId, ac)
      .then(r => this.savedFacts = r.foundFacts);
  }

  @action setFbId = id => this.fbid = id;


  getFacts = obj => {
    obj.map(i => {
      factAPI.read(i)
        .then(res => this.savedFacts.push(res[0]));
    });
  }

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
        this.user = user;
        this.savedFacts = this.user.foundFacts;
      });
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
