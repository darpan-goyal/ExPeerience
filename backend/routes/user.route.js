const router = require('express').Router();
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
  const password = req.body.password;
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
  User.findById(req.params.id)
    .then(user => {
      user.username = user.username;
      user.password = user.password;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.biography = req.body.biography;
      user.college = req.body.college;
      user.major = req.body.major;
      user.skills = req.body.skills;
      user.picture = req.body.picture;
      user.resume = req.body.resume;

      user.save()
        .then(() => res.json('User updated.'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
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
      if (user.password === req.body.password) {
        res.json(user);
      } else {
        res.status(400).json('Invalid password.');
      }
    })
    .catch(err => res.status(400).json('Invalid username.'));
});

module.exports = router;