var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var itemSchema = new Schema({
    username: {
    type: String,
    required: true
    },
    contents: {
       type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

var Item = mongoose.model(
    'items',
    itemSchema
);

module.exports = Item;