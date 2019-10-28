const router = require('express').Router();
const bcrypt = require('bcryptjs')
let User = require('../models/user.model');

//gets a user given an id
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

//gets all users
router.route('/').get((req, res) => {
  User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

//adds a user
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const biography = req.body.biography;
  const college = req.body.college;
  const major = req.body.major;
  const skills = req.body.skill;
  const picture = req.body.picture;
  const resume = req.body.resume;

  const newUser = new User({
    username,
    password,
  	firstName,
    lastName,
    biography,
    college,
    major,
    skills,
    picture,
    resume
  });

  newUser.save()
    .then(newUser => res.json(newUser))
    .catch(err => res.status(400).json('Error: ' + err));
});

//updates a user given an id
router.route('/update/:id').post((req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('User updated.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//deletes a user given an id
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//authenticates a login given username and password
router.route('/authenticate').post((req, res) => {
  User.findOne({username: req.body.username})
    .then(user => {
      bcrypt.compare(req.body.password, user.password, (err, resp) => {
        resp ? res.json(user) : res.status(400).json('Invalid credentials.');
      });
    })
    .catch(err => res.status(400).json('Invalid credentials.'));
});

module.exports = router;
