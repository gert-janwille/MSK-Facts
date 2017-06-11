const url = `/api/facts`;
import fetch from 'isomorphic-fetch';

export default {

  read: _id => {
    const selectOne = _id ? `?id=${_id}` : ``;
    return fetch(`${url}${selectOne}`)
      .then(r => r.json());

  },

  delete: _id => {

    const method = `DELETE`;

    return fetch(`${url}/${_id}`, {method});

  }

};
