let mongoose = require("mongoose");
let QuestionSchema = mongoose.Schema({
  question: {
    type: String,
  },
  optionA: {
    type: String,
  },
  optionB: {
    type: String,
  },
  optionC: {
    type: String,
  },
  optionD: {
    type: String,
  },
  correctAnswer: {
    type: String,
  },
});

let questionList = module.exports = mongoose.model(
  "questionList",
  QuestionSchema
);
