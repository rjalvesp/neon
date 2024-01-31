const { getIdeaById } = require('../../../../models/ideas');

const getIdeaByIdController = async ({ id }) => {
  return await getIdeaById(id);
};

module.exports = getIdeaByIdController;
