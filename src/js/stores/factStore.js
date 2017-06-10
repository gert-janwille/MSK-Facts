import {observable, action} from 'mobx';

import Fact from '../models/Fact';
import factsAPI from '../lib/api/facts';

class Store {
  @observable fact = {}

  @observable facts = []
  @observable shownFacts = []

  init = () => {
    factsAPI.read()
      .then(facts => this._add(...facts))
      .then(this.addLogin())
      .then(this.pickRandom);
  }

  constructor() {
    this.init();
  }


  @action _add = (...facts) => {
    facts.forEach(f => this.facts.push(new Fact(f)));
  }

  @action pickRandom = () => {
    if (this.facts.length <= 0) this.changeFacts();

    const rnumber = Math.floor(Math.random() * this.facts.length);
    const randomPicked = this.facts[rnumber];

    this.facts.splice(rnumber, 1);
    this.shownFacts.push(randomPicked);

    this.setfact(randomPicked);
  }


  @action setfact = fact => {
    this.fact = fact;
  }


  changeFacts = () => {
    this.facts = this.shownFacts.slice();
    this.shownFacts.clear();

    this.pickRandom();
  }

  addLogin = () => this.facts.splice(2, 0, new Fact({fact: `login`}));

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
