const { createIdea } = require('../../../../models/ideas');

const createIdeaController = async (body) => {
  return await createIdea(body);
};

module.exports = createIdeaController;
