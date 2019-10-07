const router = require('express').Router();
let Major = require('../models/major.model');

router.route('/').get((req, res) => {
  Major.find()
    .then(major => res.json(major))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;

  const newMajor = new Major({
  	name
  });

  newMajor.save()
    .then(() => res.json('Major added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;