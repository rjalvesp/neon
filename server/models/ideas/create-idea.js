const { v4: uuid } = require('uuid');
const { mainDb } = require('../../services/databases');
const { createAssignees } = require('../assignees');
const { ValidateIdeaBody } = require('../../common/validators/ideas');

const createIdea = async (body, _sql) => {
  const sql = _sql || mainDb.getMainConnection();
  const { assignees = [], ...idea } = body;
  try {
    const ideaId = uuid();

    await sql.beginTransaction();

    ValidateIdeaBody(body);

    const createIdeaQuery = `
      INSERT INTO ideas (id, postedBy, summary, workflow)
      VALUES (?, ?, ?, ?);
    `;
    const createIdeaValues = [
      ideaId,
      idea.postedBy,
      idea.summary,
      idea.workflow,
    ];

    await sql.execute(createIdeaQuery, createIdeaValues);

    const assigneeValues = assignees.map((name) => ({ idIdea: ideaId, name }));

    await createAssignees(assigneeValues, sql);

    await sql.commit();

    return ideaId;
  } catch (e) {
    await sql.rollback();
    console.error(`Error creatingIdea ${e}`);
    throw new Error(`Error creatingIdea ${e}`);
  }
};

module.exports = createIdea;
