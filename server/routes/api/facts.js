const {Fact} = require(`mongoose`).models;
const {pick, omit, isEmpty} = require(`lodash`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {
    method: `GET`,
    path: `${base}/facts`,

    handler: (req, res) => {
      let prepData = {};
      const q = pick(req.query, [`id`, `artwork`]);

      if (!isEmpty(q)) {

        if (q.id && q.artwork) prepData = {_id: q.id, artworkMatch: q.artwork.replace(/ /g, `-`)};
        if (q.id) prepData = {_id: q.id.toString()};
        if (q.artwork) prepData = {artworkMatch: q.artwork.replace(/-/g, ` `)};

        Fact.find(prepData)
            .then(fact => {
              if (isEmpty(fact)) return res(Boom.notFound());
              return res(fact);
            })
            .catch(() => res(Boom.badRequest()));

      } else {
        Fact.find()
          .then(facts => {
            return res(facts);
          });
      }
    }
  },


  {
    method: `POST`,
    path: `${base}/facts`,

    config: {
      validate: {
        options: {
          abortEarly: false
        },
        payload: {
          fact: Joi.string().min(1).required(),
          artworkMatch: Joi.string(),
          isActive: Joi.string()
        }
      }
    },

    handler: (req, res) => {
      const data = pick(req.payload, [`fact`, `artworkMatch`, `isActive`]);
      const user = new Fact(data);

      user.save()
        .then(u => {
          u = omit(u.toJSON(), [`__v`]);
          return res(u);
        })
        .catch(() => res(Boom.badRequest(`cannot save fact`)));
    }
  },

  {
    method: `DELETE`,
    path: `${base}/facts/{_id}`,

    config: {

      validate: {
        params: {
          _id: Joi.string().min(1).required(),
        }
      }
    },

    handler: (req, res) => {
      const {_id} = req.params;

      Fact.findOneAndRemove({_id: _id})
        .then(fact => {
          if (!fact) return res(Boom.notFound());
          return res({statuscode: 200});
        })
        .catch(() => res(Boom.badRequest()));
    }
  }

];