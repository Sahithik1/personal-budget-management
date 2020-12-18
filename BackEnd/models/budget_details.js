const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const budget_schema = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    expenses: [{
        category: {
            type: String,
            required: true
        },
        expense: {
            type: Number,
            required: true
        },
        limit: {
            type: Number
        }
    }]
});

module.exports = mongoose.model('budget', budget_schema);