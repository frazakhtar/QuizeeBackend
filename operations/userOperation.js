let UserSchema = require("../modals/userSchema");
let Promise = require("promise");
let Bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

let loginUser = (userDetails) => {
  return new Promise((resolve, reject) => {
    UserSchema.findOne({ user_name: userDetails.userName }).then((user) => {
      if (!user) {
        return resolve("User Not Found");
      }
      Bcrypt.compare(userDetails.password, user.password)
        .then((result) => {
          if (!result) {
            resolve("User credentials not match");
          }
          const token = jwt.sign(
            { userName: user.user_name, userId: user._id },
            "JAY_SIYA_RAM",
            {
              expiresIn: "30m",
            }
          );
          let userResponse = {
            token: token,
            userName: user.user_name,
            email: user.email,
            userId: user._id,
            role: user.role
          }
          resolve(userResponse);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

//Register new user
let signUp = (userDetails) => {
  return new Promise((resolve, reject) => {
    if (userDetails) {
      Bcrypt.hash(userDetails.password, 10).then((hash) => {
        userDetails.password = hash;
        let userSchema = new UserSchema(userDetails);
        userSchema
          .save()
          .then((result) => {
            if (result) {
              const token = jwt.sign(
                { userName: result.user_name, userId: result._id },
                "JAY_SIYA_RAM",
                {
                  expiresIn: "30m",
                }
              );
              let userResponse = {
                token: token,
                userName: result.user_name,
                email: result.email,
                userId: result._id,
                role: result.role
              }
              resolve(userResponse);
            } else {
              reject("Error in creating new user");
            }
          })
          .catch((err) => {
            console.log("Error in creating new user", err);
          });
      });
    } else {
      reject("Error in creating new user");
    }
  });
};

module.exports = {
  signUp: signUp,
  loginUser: loginUser,
};
