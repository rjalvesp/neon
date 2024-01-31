const { z } = require('zod');

const assigneesBody = z.array(
  z.object({
    idIdea: z.string().uuid(),
    name: z.string().max(255),
  }),
);

const ValidateAssigneesBody = (body) => assigneesBody.parse(body);

module.exports = {
  ValidateAssigneesBody,
};
