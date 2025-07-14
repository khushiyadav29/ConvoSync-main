// logic for connection with database
const mongoose = require('mongoose'); // using mongoose for connection 
require('dotenv').config();

// Get MongoDB URI from environment variable
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // The following options are no longer supported in Mongoose 6+
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

// For error handling even after initial connection
const db2 = mongoose.connection;

db2.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db2.once('open', function () {
  console.log('Connected to Database :: MongoDB');
});

// export connectDB function
module.exports = connectDB;