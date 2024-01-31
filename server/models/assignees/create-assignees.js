const { v4: uuid } = require('uuid');
const { mainDb } = require('../../services/databases');

const createAssignees = async (body, _sql) => {
  const sql = _sql || mainDb.getMainConnection();
  try {
    const id = uuid();
    const createAssigneesQuery = `
      INSERT INTO assignees (id, idIdea, name)
      VALUES ${body.map(() => '(?, ?, ?)').join(', ')};
    `;
    const createAssigneesValues = body
      .map((assignee) => [id, assignee.idIdea, assignee.name])
      .flat();

    await sql.execute(createAssigneesQuery, createAssigneesValues);

    return;
  } catch (e) {
    console.error(`Error creatingAssignee ${e}`);
    throw new Error(`Error creatingAssignee ${e}`);
  }
};

module.exports = createAssignees;
