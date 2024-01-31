const { ValidatePageBody } = require('../../../../../common/validators/page');

const isOffsetValid = (req, _res, next) => {
  try {
    if (!req.query.offset) {
      throw new Error('Invalid offset');
    }
    req.query = {
      offset: parseInt(req.query.offset, 10),
      limit: parseInt(req.query.limit, 10),
    };
    ValidatePageBody(req.query);
    next();
  } catch (error) {
    error.code = error.name;
    next(error);
  }
};

module.exports = isOffsetValid;
