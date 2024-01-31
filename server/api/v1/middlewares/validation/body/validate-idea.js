const { ValidateIdeaBody } = require('../../../../../common/validators/ideas');

const isIdeaValid = (req, _res, next) => {
  try {
    ValidateIdeaBody(req.body);
    next();
  } catch (error) {
    error.code = error.name;
    next(error);
  }
};

module.exports = isIdeaValid;
