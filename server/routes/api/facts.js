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
      const conditions = {};
      const q = pick(req.query, [`id`, `artwork`, `tags`]);

      //id;
      if (!isEmpty(q.id)) conditions._id = q.id;
      //artwork
      if (!isEmpty(q.artwork)) conditions.artworkMatch = new RegExp(`^${q.artwork.replace(/-/g, ` `)}$`, `i`);
      //Tags;
      if (!isEmpty(q.tags)) conditions.tags = {$all: q.tags.split(` `)};

      Fact.find(isEmpty(conditions) ? `` : conditions)
        .then(piece => {
          if (isEmpty(piece)) return res(Boom.notFound());
          return res(piece);
        });
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
          tags: Joi.array(),
          isActive: Joi.boolean()
        }
      }
    },

    handler: (req, res) => {
      const data = pick(req.payload, [`fact`, `artworkMatch`, `tags`, `isActive`]);
      const fact = new Fact(data);

      fact.save()
        .then(u => {
          u = omit(u.toJSON(), [`__v`]);
          return res(u);
        })
        .catch(e => {
          console.log(e);
          res(e);
        });
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
