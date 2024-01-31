const { z } = require('zod');

const pageBody = z.object({
  offset: z.number().min(0),
  limit: z.number().min(1),
});

const ValidatePageBody = (body) => pageBody.parse(body);

module.exports = {
  ValidatePageBody,
};
