const { getIdeas } = require('../../../../models/ideas');

const getIdeaByIdController = async ({ offset, limit }) => {
  return await getIdeas(offset, limit);
};

module.exports = getIdeaByIdController;
