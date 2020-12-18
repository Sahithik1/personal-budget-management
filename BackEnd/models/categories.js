const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const budget_schema = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    categories: [{
        categoryName:  { 
            type: String,
            required: true
        },
        limit: {
            type: Number
        }
    }]
});

module.exports = mongoose.model('categories', budget_schema);