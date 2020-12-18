var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));

module.exports = mongoose;