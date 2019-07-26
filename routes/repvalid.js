const isEmpty = require("./isempty.js");
const Validator = require("validator");

module.exports = function validateusername(Item) {
    let errors = {};


    Item.replacementname = !isEmpty(Item.replacementname) ? Item.replacementname : "";



    if (!Validator.isAlphanumeric(Item.replacementname)) {
        errors.replacementname = "replacement name is invalid";
    }

    if (Validator.isEmpty(Item.replacementname)) {
        errors.replacementname = "replacement name is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
