const {Skill} = require(`mongoose`).models;
const {pick, omit} = require(`lodash`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {
    method: `GET`,
    path: `${base}/skills/{_type?}`,

    config: {

      validate: {
        params: {
          _type: Joi.string().min(2),
        }
      }
    },

    handler: (req, res) => {
      const {_type} = req.params;

      if (_type) {

        const d = _type.replace(/-/g, ` `);
        const name = d.replace(/\b./g, function(m) { return m.toUpperCase(); });

        Skill.find({type: name})
          .then(project => {
            if (!project) return res(Boom.notFound());
            return res(project);
          })
          .catch(() => res(Boom.badRequest()));

      } else {
        Skill.find()
        .then(skills => {
          return res({skills});
        });
      }

    }
  },

  {
    method: `POST`,
    path: `${base}/skills`,

    config: {
      validate: {
        options: {
          abortEarly: false
        },
        payload: {
          skill: Joi.string().min(2).required(),
          type: Joi.string().required(),
          level: Joi.string().required()
        }
      }
    },

    handler: (req, res) => {
      const data = pick(req.payload, [`skill`, `type`, `level`]);
      const work = new Skill(data);

      work.save()
        .then(u => {
          u = omit(u.toJSON(), [`__v`]); //verwijder data uit array
          return res(u);
        })
        .catch(() => res(Boom.badRequest(`cannot save skill`)));
    }
  },

  {
    method: `DELETE`,
    path: `${base}/skills/{_name}`,

    config: {

      validate: {
        params: {
          _name: Joi.string().min(2).required(),
        }
      }
    },

    handler: (req, res) => {
      const {_name} = req.params;

      const name = _name.replace(/-/g, ` `);

      Skill.findOneAndRemove({skill: name})
        .then(project => {
          if (!project) return res(Boom.notFound());
          return res(`removed`);
        })
        .catch(() => res(Boom.badRequest()));
    }
  }

];
