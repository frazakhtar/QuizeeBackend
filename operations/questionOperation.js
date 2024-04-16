let QuestionSchema = require("../modals/questionSchema");
let Promise = require("promise");

/*
Get All questions
*/
let getQuestionList = () => {
  return new Promise((resolve, reject) => {
    let questionsList = [];
    try {
      QuestionSchema.find()
        .exec()
        .then((questionList) => {
          if (questionList) {
            questionList.map((question) => {
              let que = {
                questionID: question._id,
                question: question.question,
                A: question.optionA,
                B: question.optionB,
                C: question.optionC,
                D: question.optionD,
              };
              questionsList.push(que);
            });
            resolve(questionsList);
          } else {
            reject("Error in fetching the questions list");
          }
        });
    } catch (error) {
      reject(error);
    }
  });
};

/*
get Single question
*/
let getSingleQuestionByID = (questionID) => {
  return new Promise((resolve, reject) => {
    try {
      QuestionSchema.findById({ _id: questionID })
        .exec()
        .then((question) => {
          if (question) {
            let que = {
              questionID: question._id,
              question: question.question,
              A: question.optionA,
              B: question.optionB,
              C: question.optionC,
              D: question.optionD,
            };
            resolve(que);
          } else {
            reject("Question not found");
          }
        });
    } catch (error) {
      reject(error);
    }
  });
};

/*
Save bulk question
*/
let saveBulkQuestions = (data) => {
  return new Promise((resolve, reject) => {
    try {
      data.map((question) => {
        let que = {
          question: question.question,
          optionA: question.A,
          optionB: question.B,
          optionC: question.C,
          optionD: question.D,
          correctAnswer: question.answer,
        };
        let questionSchema = new QuestionSchema(que);
        questionSchema.save();
      });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

/*
Save Single question
*/
let saveSingleQuestion = (question) => {
  return new Promise((resolve, reject) => {
    try {
      let que = {
        question: question.question,
        optionA: question.A,
        optionB: question.B,
        optionC: question.C,
        optionD: question.D,
        correctAnswer: question.answer,
      };
      let questionSchema = new QuestionSchema(que);
      questionSchema.save().then((result) => {
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  });
};

/*
Update Single question
*/
let updateQuestionByID = (id, question) => {
  return new Promise((resolve, reject) => {
    try {
      let que = {
        question: question.question,
        optionA: question.A,
        optionB: question.B,
        optionC: question.C,
        optionD: question.D,
        correctAnswer: question.answer,
      };
      QuestionSchema.findByIdAndUpdate(
        id,
        { $set: que },
        { upsert: true }
      ).then((result) => {
        if (result) {
          resolve(result);
        } else {
          reject("Error in updating");
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

/*
Delete All questions
*/
let deleteAllQuestion = () => {
  return new Promise((resolve, reject) => {
    console.log("inside delete all");
    try {
      QuestionSchema.deleteMany({}).then((result) => {
        console.log("result");
        console.log(result);
        if (result) {
          resolve(result);
        } else {
          reject("Error in deletion");
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

/*
Delete Single question
*/
let deleteQuestionByID = (id) => {
  console.log("id");
  console.log(id);
  return new Promise((resolve, reject) => {
    try {
      QuestionSchema.deleteOne({ _id: id }).then((result) => {
        console.log("result");
        console.log(result);
        if (result) {
          resolve(result);
        } else {
          reject("Error in deletion");
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getQuestionList: getQuestionList,
  getSingleQuestionByID: getSingleQuestionByID,
  saveBulkQuestions: saveBulkQuestions,
  saveSingleQuestion: saveSingleQuestion,
  updateQuestionByID: updateQuestionByID,
  deleteAllQuestion: deleteAllQuestion,
  deleteQuestionByID: deleteQuestionByID,
};
