let express = require("express");
let router = express.Router();
let QuestionOperation = require("../operations/questionOperation");

router.get("/getQuestionsList", (req, res) => {
  QuestionOperation.getQuestionList()
    .then((result) => {
      if (result) {
        res.status(200).json({
          MSG: "All Questions Loaded Successfully",
          result: result,
        });
      } else {
        res.status(400).json({
          MSG: "Error in Loading Questions",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        MSG: "Error in Loading Questions",
        Error: err,
      });
    });
});

router.get("/getSingleQuestion", (req, res) => {
  let questionID = req.query.id;
  QuestionOperation.getSingleQuestionByID(questionID)
    .then((result) => {
      if (result) {
        res.status(200).json({
          MSG: "Question Loaded Successfully",
          result: result,
        });
      } else {
        res.status(400).json({
          MSG: "Error in Loading Question",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        MSG: "Error in Loading Question",
        Error: err,
      });
    });
});

router.post("/saveBulkquestion", (req, res) => {
  QuestionOperation.saveBulkQuestions(req.body)
    .then((result) => {
      if (result) {
        res.status(200).json({
          MSG: "Saved Successfully",
          result: result,
        });
      } else {
        res.status(400).json({
          MSG: "Error in saving",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        MSG: "Error in saving",
        Error: err,
      });
    });
});

router.post("/saveSingleQuestion", (req, res) => {
  QuestionOperation.saveSingleQuestion(req.body)
    .then((result) => {
      if (result) {
        res.status(200).json({
          MSG: "Saved Successfully",
          result: result,
        });
      } else {
        res.status(400).json({
          MSG: "Error in saving",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        MSG: "Error in saving",
        Error: err,
      });
    });
});

router.post("/updateQuestionByID", (req, res) => {
  let questionID = req.body.id;
  let data = req.body.data;
  QuestionOperation.updateQuestionByID(questionID, data)
    .then((result) => {
      if (result) {
        res.status(200).json({
          MSG: "Updated Successfully",
          result: result,
        });
      } else {
        res.status(400).json({
          MSG: "Error in updating",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        MSG: "Error in updating",
        Error: err,
      });
    });
});

router.delete("/deleteAllQuestions", (req, res) => {
  QuestionOperation.deleteAllQuestion()
    .then((result) => {
      if (result) {
        res.status(200).json({
          MSG: "All Questions Deleted Successfully",
          result: result,
        });
      } else {
        res.status(400).json({
          MSG: "Error in deleting questions",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        MSG: "Error in deleting questions",
        Error: err,
      });
    });
});

router.delete("/deleteSingleQuestion", (req, res) => {
  let id = req.query.id;
  QuestionOperation.deleteQuestionByID(id)
    .then((result) => {
      if (result) {
        res.status(200).json({
          MSG: "Question Deleted Successfully",
          result: result,
        });
      } else {
        res.status(400).json({
          MSG: "Error in deleting questions",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        MSG: "Error in deleting questions",
        Error: err,
      });
    });
});

module.exports = router;
