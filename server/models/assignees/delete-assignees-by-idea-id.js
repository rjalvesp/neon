const { mainDb } = require('../../services/databases');

const deleteAssigneesByIdeaId = async (idIdea, _sql) => {
  const sql = _sql || mainDb.getMainConnection();
  try {
    await sql.beginTransaction();

    const deleteAssigneesQuery = `
      DELETE FROM assignees
      WHERE idIdea = ?;
    `;
    const deleteAssigneesValues = [idIdea];

    await sql.execute(deleteAssigneesQuery, deleteAssigneesValues);

    return;
  } catch (e) {
    console.error(`Error deletingAssigneesByIdeaId ${e}`);
    throw new Error(`Error deletingAssigneesByIdeaId ${e}`);
  }
};

module.exports = deleteAssigneesByIdeaId;
