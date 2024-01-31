const { deleteIdeaById } = require('../../../../models/ideas');

const deleteIdeaByIdController = async ({ id }) => {
  return await deleteIdeaById(id);
};

module.exports = deleteIdeaByIdController;
