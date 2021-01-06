const { Respondent, Question, Answer } = require("./models");

function getActiveSurvey() {
  // TODO: check db open = true
  return 1;
}

async function startSurvey(email) {
  // If we already have a respondent with the same params
  // delete all answers and fetch the existing one
  const respondent = await Respondent.create({
    email,
    surveyId: getActiveSurvey(),
  });
  return respondent;
}

async function answerQuestion(questionId, email, description) {
  const respondent = await Respondent.findOne({
    email,
    surveyId: getActiveSurvey(),
  });
  // If no respondent ????

  const question = await Question.findOne({ where: { id: questionId } });
  // If no question, explode things!!!

  const answer = await Answer.create({
    questionId,
    respondentId: respondent.id,
    description,
  });
}

module.exports = { startSurvey, answerQuestion };
