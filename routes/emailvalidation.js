
const isEmpty = require("./isempty.js");
const Validator = require("validator");

module.exports = function validateemail(Item) {
    let errors = {};


  Item.email = !isEmpty(Item.email) ? Item.email : "";

  if (!Validator.isEmail(Item.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(Item.email)) {
    errors.email = "Email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};