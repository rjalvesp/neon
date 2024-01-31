const { createRating } = require('../../../../../models/ratings');

const createIdeaRatingController = async (params, body) => {
  return await createRating({ ...body, idIdea: params.id });
};

module.exports = createIdeaRatingController;
