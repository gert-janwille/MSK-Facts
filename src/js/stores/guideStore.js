import {observable, action} from 'mobx';
import {isEmpty} from 'lodash';

import factsAPI from '../lib/api/facts';
import artAPI from '../lib/api/art';
import userAPI from '../lib/api/users';

import sendMail from '../lib/sendMail';

class Store {
  @observable party = ``
  @observable tour = []
  @observable friends = []
  @observable isLoading = false

  @observable screenPop = ``;
  @observable popupRequired = false;

  @observable randomPersons = 2;
  @observable maxPersons = 5;

  id = ``

  tags = [];
  users = [];
  count = 0;


  @action setParty = c => this.party = c;
  @action setArt = c => this.tour = c;

  @action setScreen = c => {
    this.popupRequired = true;
    this.screenPop = c;
  };

  @action setPopUp = bool => this.popupRequired = bool;

  @action increse = () => this.randomPersons < this.maxPersons ? this.randomPersons++ : ``;
  @action decrese = () => this.randomPersons > 0 ? this.randomPersons-- : ``;



  @action createTour = (userCase, facts, id, value) => {
    switch (userCase) {
    case `Eigen rondleiding`:
      this.selectTour(id, facts);
      break;
    case `Met vrienden`:
      this.getFriends(id, facts);
      break;
    case `Verras mij!`:
      this.pickRandom(id, facts, value);
      break;
    }
  }

  @action requestFriends = (friendId, myId, facts) => {
    this.selectTour(myId, facts);
    this.makeNotification(friendId, myId, facts);
  }

  selectTour = (id, f) => {
    this.id = id;
    this.isLoading = true;
    this.tags = [];

    let counter = 0;

    f.forEach((fact, ix, arr) => {
      const {_id} = fact;
      counter ++;
      this.getFactfromId(_id);

      if (counter === arr.length) setTimeout(() => this.getArt(), 1000);
    });
  }

  getFactfromId = id => {
    factsAPI.read(id)
      .then(fact => this.tags.push.apply(this.tags, fact[0].tags));
  };

  getArt = () => {
    const commonTags = this.getMostTags(this.tags);

    artAPI.read(isEmpty(commonTags) ? `` : commonTags)
      .then(art => {
        this.setArt(art);
        this.pushTour(art);
      });
  }

  pushTour = tour => {
    this.setArt(tour);
    let data = ``;

    tour.forEach((i, id) => {
      data += i.name;
      if (id !== tour.length - 1) data += `, `;
    });

    userAPI.updateTours(this.id, data);
  }

  getMostTags = arr => {
    const cache = {};
    const results = [];

    arr.map(i => cache[i] === true ? results.push(i) : cache[i] = true);

    return results;
  }

  getFriends = () => {
    window.FB.api(`/me/friends`, response => {
      if (!response.data) return;
      response.data.forEach(friend => {
        this.friends.push(friend);
      });
    });
  }

  pickRandom = (id, facts, value) => {
    userAPI.read()
      .then(i => {
        this.users.push.apply(this.users, i);
        this.pickUsers(id, facts, value);
      });
  }

  pickUsers = (id, facts, value) => {
    const temp = [];
    const amount = Math.floor(Math.random() * value);

    for (let i = 0;i < value;i ++) {
      const cur = this.users[amount];
      temp.push(cur);
      this.users.splice(amount, 1);
      console.log(temp);

      if (i + 1 >= value) setTimeout(() => temp.map(u => this.makeNotification(u.id, id, facts)), 2000);
    }
  }

  makeNotification = (friend, myId, facts) => {
    userAPI.notification(friend, myId)
      .then(e => console.log(e))
      .catch(i => console.log(i));

    this.selectTour(myId, facts);

    userAPI.read(myId)
      .then(user => {
        const {fistname, lastname, email} = user[0];
        sendMail(fistname, lastname, email);
      });
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
