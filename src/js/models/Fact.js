import {observable, action} from 'mobx';

export default class Tweet {
  fact = ``
  created = ``
  modified = ``
  _id = ``
  artworkMatch = ``
  isActive = true

  @observable
  isShown = false

  @action
  hasShowed = () => {
    if (!this.isShown) this.isShown = true;
  }

  constructor({_id, created, fact, artworkMatch, modified, isActive}) {

    this._id = _id;
    this.created = created;
    this.fact = fact;
    this.artworkMatch = artworkMatch;
    this.modified = modified;
    this.isActive = isActive;

  }
}
