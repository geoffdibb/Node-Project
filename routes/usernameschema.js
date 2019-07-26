
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let itemSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true

    },

    password: {
        type: String,
        required: true,

    }
});

itemSchema.plugin(uniqueValidator);


let Item = mongoose.model(
    'items',
    itemSchema
);

module.exports = Item;