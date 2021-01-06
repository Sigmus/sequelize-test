const { Sequelize, Model, DataTypes } = require("sequelize");

const db = require("./db");

class Survey extends Model {}
Survey.init(
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    open: DataTypes.BOOLEAN,
  },
  { sequelize: db, modelName: "survey" }
);

class Respondent extends Model {}
Respondent.init(
  {
    email: DataTypes.STRING,
    // date
  },
  { sequelize: db, modelName: "respondent" }
);

class Question extends Model {}
Question.init(
  {
    description: DataTypes.STRING,
  },
  { sequelize: db, modelName: "question" }
);

class Answer extends Model {}
Answer.init(
  {
    description: DataTypes.STRING,
    // respondendId
  },
  { sequelize: db, modelName: "answer" }
);

Survey.hasMany(Question);
Question.belongsTo(Survey);
Respondent.belongsTo(Survey);
Respondent.hasMany(Answer);
Answer.belongsTo(Respondent);
Answer.belongsTo(Question);

module.exports = { Survey, Respondent, Question, Answer };
