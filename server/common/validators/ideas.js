const { z } = require('zod');

const ideaBody = z.object({
  assignees: z.array(z.string().max(255)),
  workflow: z.string().max(255),
  postedBy: z.string().max(255),
  summary: z.string(),
});

const ValidateIdeaBody = (body) => ideaBody.parse(body);

module.exports = {
  ValidateIdeaBody,
};
