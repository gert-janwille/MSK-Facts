const url = `/api/art`;
import fetch from 'isomorphic-fetch';

export default {

  read: arr => {
    let qs = ``;

    arr.map((key, i) => {
      qs += `${key}`;
      if (i !== arr.length - 1) qs += `+`;
    });

    const selectOne = qs ? `?tags=${qs}` : ``;
    return fetch(`${url}${selectOne}`)
      .then(r => r.json());
  }

};
