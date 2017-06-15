import {observable, action} from 'mobx';
import QrCode from 'qrcode-reader';

import Fact from '../models/Fact';
import factsAPI from '../lib/api/facts';

class Store {
  @observable fact = {}
  @observable scannedFact = {}

  @observable facts = []
  @observable shownFacts = []

  @observable searchFact = {};

  init = () => {
    factsAPI.read()
      .then(facts => this._add(...facts))
      .then(this.pickRandom);
  }

  constructor() {
    this.init();
    this.qr = new QrCode();
  }


  @action _add = (...facts) => facts.forEach(f => this.facts.push(new Fact(f)));

  @action pickRandom = () => {
    if (this.facts.length <= 0) this.changeFacts();

    const rnumber = Math.floor(Math.random() * this.facts.length);
    const randomPicked = this.facts[rnumber];

    this.facts.splice(rnumber, 1);
    this.shownFacts.push(randomPicked);

    this.setfact(randomPicked);
  }

  @action getFact = id => {
    factsAPI.read(id)
      .then(fact => {
        this.searchFact = fact[0];
      });
  }

  @action getQRdata = e => {
    const reader = new FileReader();

    reader.onload = e => {
      this.qr.decode(e.target.result);
      this.qr.callback = (err, res) => {
        if (err) console.error(err);
        if (res) this.scannedFact = this.readqrData(res.result);
      };
    };

    reader.readAsDataURL(e.target.files[0]);
    e.target.parentNode.reset();
  }


  @action setfact = fact => this.fact = fact;
  @action setScannedfact = fact => this.scannedFact = fact;


  readqrData = id => {
    factsAPI.read(id)
      .then(f => f !== undefined ? this.setScannedfact(f[0]) : ``);
  }

  changeFacts = () => {
    this.facts = this.shownFacts.slice();
    this.shownFacts.clear();

    this.pickRandom();
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
