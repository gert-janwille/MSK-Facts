const {Art} = require(`mongoose`).models;
const {pick, omit, isEmpty} = require(`lodash`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {
    method: `GET`,
    path: `${base}/art`,

    handler: (req, res) => {
      const conditions = {};
      const q = pick(req.query, [`id`, `name`, `artist`, `fact`, `tags`]);

      //id;
      if (!isEmpty(q.id)) conditions._id = q.id;
      //name;
      if (!isEmpty(q.name)) conditions.name = new RegExp(`^${q.name}$`, `i`);
      //artist;
      if (!isEmpty(q.artist)) conditions.artist = new RegExp(`^${q.artist}$`, `i`);
      //factMatch;
      if (!isEmpty(q.fact)) conditions.factMatch = q.fact;
      //Tags;
      if (!isEmpty(q.tags)) conditions.tags = {$in: q.tags.split(` `)};


      Art.find(isEmpty(conditions) ? `` : conditions)
        .then(piece => {
          if (isEmpty(piece)) return res(Boom.notFound());
          return res(piece);
        });

    }
  },

  {
    method: `POST`,
    path: `${base}/art`,

    config: {
      validate: {
        options: {
          abortEarly: false
        },
        payload: {
          name: Joi.string().min(1).required(),
          artist: Joi.string().required(),
          description: Joi.string().required(),
          factMatch: Joi.string(),
          tags: Joi.array().required(),
          isActive: Joi.boolean()
        }
      }
    },

    handler: (req, res) => {
      const data = pick(req.payload, [`name`, `artist`, `description`, `factMatch`, `tags`, `isActive`]);
      const art = new Art(data);

      art.save()
        .then(u => {
          u = omit(u.toJSON(), [`__v`]);
          return res(u);
        })
        .catch(e => {
          console.log(e);
          res(Boom.badRequest());
        });
    }
  },

  {
    method: `DELETE`,
    path: `${base}/art/{_id}`,

    config: {

      validate: {
        params: {
          _id: Joi.string().min(1).required(),
        }
      }
    },

    handler: (req, res) => {
      const {_id} = req.params;

      Art.findOneAndRemove({_id: _id})
        .then(piece => {
          if (!piece) return res(Boom.notFound());
          return res({statuscode: 200});
        })
        .catch(() => res(Boom.badRequest()));
    }
  }

];
