// importing the libraries
const express = require('express');
const route = express.Router();

// fetching the index page of the application
route.get('/', function (req, res) {
    res.send('Hello, you are on homepage');
})

// handling the anonymous request to the application
route.get('/*', function (req, res) {
    res.send('Hello, this is an anonymous request. No such route exist')
})

module.exports = route;