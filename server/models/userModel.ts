import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URI: any = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  dbName: 'users'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  passwordHash: String,
  
});

const User = mongoose.model('user', userSchema);
module.exports = {
  User
};
