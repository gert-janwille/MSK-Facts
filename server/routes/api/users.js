const {UserFB} = require(`mongoose`).models;
const {pick, omit} = require(`lodash`);

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

        UserFB.find({id: _id})
          .then(user => {
            return res(user);
          })
          .catch(() => res(Boom.badRequest()));

      } else {
        UserFB.find()
        .then(user => {
          return res(user);
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
          id: Joi.number().min(1).required(),
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          email: Joi.string().email().required(),
          foundFacts: [Joi.string()],
          scope: Joi.string(),
          isActive: Joi.boolean()
        }
      }
    },

    handler: (req, res) => {
      const data = pick(req.payload, [`id`, `firstName`, `lastName`, `email`, `foundFacts`, `scope`, `isActive`]);
      const user = new UserFB(data);

      user.save()
        .then(u => {
          u = omit(u.toJSON(), [`__v`]);
          return res(u);
        })
        .catch(er => {
          console.log(er);
          res(Boom.badRequest(`cannot save user`));
        });
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

      UserFB.findOneAndRemove({id: _id})
        .then(user => {
          if (!user) return res(Boom.notFound());
          return res({statuscode: 200});
        })
        .catch(() => res(Boom.badRequest()));
    }
  },


  {
    method: `PUT`,
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
      const _fact = req.query.fact;
      const _action = req.query.action;

      if (_action === `add`) {
        UserFB.findOneAndUpdate({id: _id}, {$push: {foundFacts: [_fact]}}, {new: true})
          .then(user => {
            if (!user) return res(Boom.notFound());
            return res(user);
          })
          .catch(() => res(Boom.badRequest()));
      }

      if (_action === `remove`) {
        UserFB.findOneAndUpdate({id: _id}, {$pull: {foundFacts: [_fact]}}, {new: true})
          .then(user => {
            if (!user) return res(Boom.notFound());
            return res(user);
          })
          .catch(() => res(Boom.badRequest()));
      }



    }
  }
];
