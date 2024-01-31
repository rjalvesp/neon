const { ValidateUUID } = require('../../common/validators/id');
const { mainDb } = require('../../services/databases');
const { deleteAssigneesByIdeaId } = require('../assignees');
const { deleteRatingsByIdeaId } = require('../ratings');

const deleteIdeaById = async (id, _sql) => {
  const sql = _sql || mainDb.getMainConnection();
  try {
    await sql.beginTransaction();

    ValidateUUID(id);

    await deleteAssigneesByIdeaId(id, sql);

    await deleteRatingsByIdeaId(id, sql);

    const deleteIdeaQuery = `
      DELETE FROM ideas
      WHERE id = ?;
    `;
    const deleteIdeaValues = [id];

    await sql.execute(deleteIdeaQuery, deleteIdeaValues);

    await sql.commit();

    return;
  } catch (e) {
    await sql.rollback();
    console.error(`Error deletingIdea ${e}`);
  }
};

module.exports = deleteIdeaById;
