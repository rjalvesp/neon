const { z } = require('zod');

const ValidateUUID = (id) => z.string().uuid().parse(id);

module.exports = {
  ValidateUUID,
};
