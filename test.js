const { Sequelize } = require("sequelize");
const { Survey, Respondent, Question, Answer } = require("./models");

const db = require("./db");
const actions = require("./actions");

async function test() {
  await db.sync();

  const s = await Survey.create({
    name: "A nice survey",
    description: "The best yet",
    start: new Date(2020, 0, 10),
    end: new Date(2020, 0, 20),
    open: true,
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

  const r = actions.startSurvey("peter@foo.bar");

  const a1 = actions.answerQuestion(1, "peter@foo.bar", "First answer");
  const a2 = actions.answerQuestion(2, "peter@foo.bar", "Second answer");
  const a3 = actions.answerQuestion(3, "peter@foo.bar", "Third answer");
  const a4 = actions.answerQuestion(4, "peter@foo.bar", "Fourth answer");

  //   //   const respondent = await Respondent.findOne({
  //   //     where: { id: 1, surveyId: 1 },
  //   //   });
  //   //   console.log(JSON.stringify(await respondent.getAnswers(), null, 4));

  //   const questions = await Question.findAll({ where: { surveyId: 1 } });
  //   console.log(questions.map((i) => i.id));

  //   const answers = await Answer.findAll({
  //     where: {
  //       id: {
  //         [Sequelize.Op.in]: questions.map((i) => i.id),
  //       },
  //     },
  //   });

  //   console.log(answers);
  //   console.log(answers.length);
}

test();
