const router = require('express').Router();
let College = require('../models/college.model');

router.route('/').get((req, res) => {
  College.find()
    .then(college => res.json(college))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;

  const newCollege = new College({
  	name
  });

  newCollege.save()
    .then(() => res.json('College added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;