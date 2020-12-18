// importing libraries
const app = require('express')()
const mongoose = require('mongoose')
const passport = require("passport");
const cors = require('cors');


app.use(cors());
// dependencies
require('./controllers/authentication/passport')(passport)
const index = require('./controllers/index/index')
const auth = require('./controllers/authentication/auth')
const api = require('./controllers/api/budget');

// passport configuration
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb+srv://sahithi:sahithi123@cluster0.ccr5g.mongodb.net/budget?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));

// routes
app.use('/user', auth)
app.use('/api',api)
app.use('/', index)

// hosting server
let port = 5000
app.listen(port, () => {
    console.log('Server started and running on port:', port)
})