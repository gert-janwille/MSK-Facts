const {User} = require(`mongoose`).models;
const {pick, omit, isEmpty} = require(`lodash`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {
    method: `GET`,
    path: `${base}/users/{_id?}`,

    config: {

      validate: {
        params: {
          _id: Joi.number().min(1),
        }
      }
    },

    handler: (req, res) => {
      const {_id} = req.params;

      if (_id) {

        User.find({facebookId: _id})
          .then(user => {
            if (isEmpty(user)) return res(Boom.notFound());
            return res(user);
          })
          .catch(() => res(Boom.badRequest()));

      } else {
        User.find()
        .then(user => {
          return res({user});
        });
      }
    }
  },

  {
    method: `POST`,
    path: `${base}/users`,

    config: {
      validate: {
        options: {
          abortEarly: false
        },
        payload: {
          facebookId: Joi.number().min(1).required(),
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          foundFacts: [Joi.string()],
          scope: Joi.string(),
          isActive: Joi.string()
        }
      }
    },

    handler: (req, res) => {
      const data = pick(req.payload, [`facebookId`, `name`, `email`, `foundFacts`, `scope`, `isActive`]);
      const user = new User(data);

      user.save()
        .then(u => {
          u = omit(u.toJSON(), [`__v`]);
          return res(u);
        })
        .catch(() => res(Boom.badRequest(`cannot save user`)));
    }
  },

  {
    method: `DELETE`,
    path: `${base}/users/{_id}`,

    config: {

      validate: {
        params: {
          _id: Joi.string().min(1).required(),
        }
      }
    },

    handler: (req, res) => {
      const {_id} = req.params;

      User.findOneAndRemove({facebookId: _id})
        .then(user => {
          if (!user) return res(Boom.notFound());
          return res({statuscode: 200});
        })
        .catch(() => res(Boom.badRequest()));
    }
  }

];
