const {
  ValidateRatingBody,
} = require('../../../../../common/validators/ratings');

const isRatingValid = (req, _res, next) => {
  try {
    ValidateRatingBody({ ...req.body, idIdea: req.params.id });
    next();
  } catch (error) {
    error.code = error.name;
    next(error);
  }
};

module.exports = isRatingValid;
