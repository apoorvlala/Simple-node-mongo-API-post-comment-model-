const mongoose=require('mongoose');
require('dotenv').config();
const mongDBErrors=require("mongoose-mongodb-errors");
mongoose.Promise=global.Promise;
mongoose.plugin(mongDBErrors);
mongoose.connect(process.env.MONGOURI,{ useNewUrlParser: true });
