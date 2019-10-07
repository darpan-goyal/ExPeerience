const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const biography = req.body.biography;
  const college = req.body.college;
  const skill = req.body.skill;
  const picture = req.body.picture;
  const resume = req.body.resume;

  const newUser = new User({
  	firstName,
    lastName,
    biography,
    college,
    skill,
    picture,
    resume
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;