const mongoose = require('mongoose');


const connectDatabase = (url) => {
    
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};


module.exports = connectDatabase
