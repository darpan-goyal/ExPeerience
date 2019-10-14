const router = require('express').Router();
let College = require('../models/college.model');

//gets a college given an id
router.route('/:id').get((req, res) => {
  College.findById(req.params.id)
    .then(college => res.json(college))
    .catch(err => res.status(400).json('Error: ' + err));
});

//gets all colleges
router.route('/').get((req, res) => {
  College.find()
    .then(college => res.json(college))
    .catch(err => res.status(400).json('Error: ' + err));
});

//adds a college
router.route('/add').post((req, res) => {
  const name = req.body.name;

  const newCollege = new College({
      name
  });

  newCollege.save()
    .then(() => res.json('College added.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//updates a college given an id
router.route('/update/:id').post((req, res) => {
  College.findById(req.params.id)
    .then(college => {
      college.name = req.body.name;

      college.save()
        .then(() => res.json('College updated.'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//deletes a college given an id
router.route('/:id').delete((req, res) => {
  College.findByIdAndDelete(req.params.id)
    .then(() => res.json('College deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;