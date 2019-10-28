const router = require('express').Router();
let Skill = require('../models/skill.model');

//gets a skill given an id
router.route('/:id').get((req, res) => {
  Skill.findById(req.params.id)
    .then(skill => res.json(skill))
    .catch(err => res.status(400).json('Error: ' + err));
});

//gets all skills
router.route('/').get((req, res) => {
  Skill.find()
    .then(skill => res.json(skill))
    .catch(err => res.status(400).json('Error: ' + err));
});

//adds a skill
router.route('/add').post((req, res) => {
  const name = req.body.name;

  const newSkill = new Skill({
    name
  });

  newSkill.save()
    .then(() => res.json('Skill added.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//updates a skill given an id
router.route('/update/:id').post((req, res) => {
  Skill.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('Skill updated.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//deletes a skill given an id
router.route('/:id').delete((req, res) => {
  Skill.findByIdAndDelete(req.params.id)
    .then(() => res.json('Skill deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;