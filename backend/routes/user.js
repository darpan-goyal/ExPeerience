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
    .then(() => res.json('User added.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//updates a user given an id
router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.biography = req.body.biography;
      user.college = req.body.college;
      user.skill = req.body.skill;
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

module.exports = router;