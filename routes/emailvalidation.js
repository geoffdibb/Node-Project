
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

if (!Validator.equals(Item.password, Item.password2)) {
errors.password2 = "Passwords must match";
}


  return {
    errors,
    isValid: isEmpty(errors)
  };
};