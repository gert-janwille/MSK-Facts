const url = `/api/users`;
import fetch from 'isomorphic-fetch';
import buildBody from '../buildBody';

const whitelist = {
  POST: [`id`, `firstName`, `lastName`, `email`, `foundFacts`, `scope`]
};

export default {

  read: _id => {
    const selectOne = _id ? `/${_id}` : ``;

    return fetch(`${url}${selectOne}`)
      .then(r => r.json());
  },

  create: data => {

    const method = `POST`;
    const body = buildBody(data, whitelist.POST);

    return fetch(url, {method, body})
      .then(r => r.json());

  },

  delete: _id => {

    const method = `DELETE`;

    return fetch(`${url}/${_id}`, {method});

  },

  update: (_id, fbid, action) => {

    const method = `PUT`;

    return fetch(`${url}/${_id}?fact=${fbid}&action=${action}`, {method})
      .then(r => r.json());

  },

  updateTours: (_id, data) => {

    const method = `PUT`;

    return fetch(`${url}/${_id}`, {method, data})
      .then(r => r.json());

  },

  notification: (_id, data) => {

    const method = `PUT`;
    return fetch(`${url}/${_id}?invite=${data}`, {method})
      .then(r => r.json());

  }

};
