const { ValidateUUID } = require('../../../../../common/validators/id');

const isUUIDValid = (req, _res, next) => {
  try {
    ValidateUUID(req.params.id);
    next();
  } catch (error) {
    error.code = error.name;
    next(error);
  }
};

module.exports = isUUIDValid;
