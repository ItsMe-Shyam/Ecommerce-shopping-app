
const mongoose = require('mongoose');
const connectToDatabase = () => {
    mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true})
        .then(() => {
            console.log('connected to database!')
        })
        /*
        Here we dont have to catch error because we are handling it in a better way in 'server.js' at the end 
        .catch((err) => {
            console.log(err);
        });

        */
}


module.exports = connectToDatabase;