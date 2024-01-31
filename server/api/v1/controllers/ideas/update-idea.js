const { updateIdeaById } = require('../../../../models/ideas');

const updateIdeaController = async ({ id }, body) => {
  return await updateIdeaById(id, body);
};

module.exports = updateIdeaController;
