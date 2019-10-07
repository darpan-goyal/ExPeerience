const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://Team:Teamwork@expeerience-8vflz.mongodb.net/expeerience?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const collegeRouter = require('./routes/college');
const majorRouter = require('./routes/major');
const skillRouter = require('./routes/skill');
const userRouter = require('./routes/user');

app.use('/college', collegeRouter);
app.use('/major', majorRouter);
app.use('/skill', skillRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log('Server is running on port: ${port}');
});