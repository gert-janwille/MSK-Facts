const {Work} = require(`mongoose`).models;
const {pick, omit} = require(`lodash`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {
    method: `GET`,
    path: `${base}/projects/{_name?}`,

    config: {

      validate: {
        params: {
          _name: Joi.string().min(3),
        }
      }
    },

    handler: (req, res) => {
      const {_name} = req.params;

      if (_name === `latest`) {
        Work.findOne().sort(`-date`).limit(1).exec()
          .then(project => {
            return res(project);
          });
      } else if (_name) {

        const d = _name.replace(/-/g, ` `);
        let name = d.replace(/\b./g, function(m) { return m.toUpperCase(); });
        name += `.`;

        Work.findOne({projectName: name})
          .then(project => {
            if (!project) return res(Boom.notFound());
            return res(project);
          })
          .catch(() => res(Boom.badRequest()));

      } else {
        Work.find()
        .then(projects => {
          return res({projects});
        });
      }

    }
  },

  {
    method: `POST`,
    path: `${base}/projects`,

    config: {
      validate: {
        options: {
          abortEarly: false
        },
        payload: {
          projectName: Joi.string().min(3).required(),
          made: Joi.string().min(3).required(),
          undertitle: Joi.string().min(3).required(),
          goal: Joi.string().min(3).required(),
          answer: Joi.string().min(3).required(),
          whatDid: Joi.string().min(3).required(),
          url: Joi.string().min(3).required(),
          movieTxt: Joi.string().min(3).required(),
          quote: Joi.string().min(3).required(),
          title2: Joi.string().min(3).required(),
          text2: Joi.string().min(3).required(),
          images: Joi.string().min(3).required(),
          color: Joi.string().min(3).required()
        }
      }
    },

    handler: (req, res) => {
      const data = pick(req.payload, [`projectName`, `made`, `undertitle`, `goal`, `answer`, `whatDid`, `url`, `movieTxt`, `quote`, `title2`, `text2`, `images`, `color`]);
      const work = new Work(data);

      work.save()
        .then(u => {
          u = omit(u.toJSON(), [`__v`, `isActive`]); //verwijder data uit array
          return res(u);
        })
        .catch(() => res(Boom.badRequest(`cannot save project`)));

    }
  },

  {
    method: `DELETE`,
    path: `${base}/projects/{_name}`,

    config: {

      validate: {
        params: {
          _name: Joi.string().min(3).required(),
        }
      }
    },

    handler: (req, res) => {
      const {_name} = req.params;

      const d = _name.replace(/-/g, ` `);
      let name = d.replace(/\b./g, function(m) { return m.toUpperCase(); });
      name += `.`;

      Work.findOneAndRemove({projectName: name})
        .then(project => {
          if (!project) return res(Boom.notFound());
          return res(`removed`);
        })
        .catch(() => res(Boom.badRequest()));
    }
  }

];
