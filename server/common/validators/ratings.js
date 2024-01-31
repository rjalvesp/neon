const { z } = require('zod');

const ratingBody = z.object({
  score: z.number().max(5).min(1),
  idIdea: z.string().uuid(),
});

const ValidateRatingBody = (body) => ratingBody.parse(body);

module.exports = {
  ValidateRatingBody,
};
