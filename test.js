const { Sequelize, Model, DataTypes } = require("sequelize");

//const sequelize = new Sequelize("sqlite::memory:");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

class Survey extends Model {}
Survey.init(
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    open: DataTypes.BOOLEAN,
  },
  { sequelize, modelName: "survey" }
);

class Respondent extends Model {}
Respondent.init(
  {
    email: DataTypes.STRING,
    // date
  },
  { sequelize, modelName: "respondent" }
);

class Question extends Model {}
Question.init(
  {
    description: DataTypes.STRING,
  },
  { sequelize, modelName: "question" }
);

class Answer extends Model {}
Answer.init(
  {
    description: DataTypes.STRING,
    // respondendId
  },
  { sequelize, modelName: "answer" }
);

Survey.hasMany(Question);
Question.belongsTo(Survey);
Respondent.belongsTo(Survey);
Respondent.hasMany(Answer);

Answer.belongsTo(Respondent);
Answer.belongsTo(Question);

(async () => {
  await sequelize.sync();

  const s = await Survey.create({
    name: "A nice survey",
    description: "The best yet",
    start: new Date(2020, 0, 10),
    end: new Date(2020, 0, 20),
    open: true,
  });

  const r = await Respondent.create({
    email: "peter@foo.bar",
    surveyId: s.id,
  });

  const q1 = await Question.create({
    description: "First question",
    surveyId: s.id,
  });
  const q2 = await Question.create({
    description: "Second question",
    surveyId: s.id,
  });
  const q3 = await Question.create({
    description: "Third question",
    surveyId: s.id,
  });
  const q4 = await Question.create({
    description: "Fourth question",
    surveyId: s.id,
  });

  const a1 = await Answer.create({
    description: "I like first",
    questionId: q1.id,
    respondentId: r.id,
  });
  const a2 = await Answer.create({
    description: "I like second",
    questionId: q2.id,
    respondentId: r.id,
  });
  const a3 = await Answer.create({
    description: "I like third",
    questionId: q3.id,
    respondentId: r.id,
  });
  const a4 = await Answer.create({
    description: "I like fourth",
    questionId: q4.id,
    respondentId: r.id,
  });

  //   const respondent = await Respondent.findOne({
  //     where: { id: 1, surveyId: 1 },
  //   });
  //   console.log(JSON.stringify(await respondent.getAnswers(), null, 4));

  const questions = await Question.findAll({ where: { surveyId: 1 } });
  console.log(questions.map((i) => i.id));

  const answers = await Answer.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: questions.map((i) => i.id),
      },
    },
  });

  console.log(answers);
  //   console.log(answers.length);
})();
