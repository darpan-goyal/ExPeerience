const router = require('express').Router();
let Skill = require('../models/skill.model');

router.route('/').get((req, res) => {
  Skill.find()
    .then(skill => res.json(skill))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;

  const newSkill = new Skill({
  	name
  });

  newSkill.save()
    .then(() => res.json('Skill added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;