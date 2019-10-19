const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

const collegeRouter = require('./routes/college.route');
const majorRouter = require('./routes/major.route');
const skillRouter = require('./routes/skill.route');
const userRouter = require('./routes/user.route');
const projectRouter = require('./routes/project.route');

app.use('/college', collegeRouter);
app.use('/major', majorRouter);
app.use('/skill', skillRouter);
app.use('/user', userRouter);
app.use('/project', projectRouter);

app.listen(port, () => {
    console.log('Server is running on port: ${port}');
});