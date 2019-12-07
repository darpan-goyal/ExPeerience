const router = require('express').Router();
let Request = require('../models/request.model');

//gets a request given an id
router.route('/:id').get((req, res) => {
  Request.findById(req.params.id)
    .then(request => res.json(request))
    .catch(err => res.status(400).json('Error: ' + err));
});

//gets all requests
router.route('/').get((req, res) => {
  Request.find()
    .then(request => res.json(request))
    .catch(err => res.status(400).json('Error: ' + err));
});

//adds a request
router.route('/add').post((req, res) => {
  const requester = req.body.requester;
  const creator = req.body.creator;
  const project = req.body.project;

  const newRequest = new Request({
    requester,
    creator,
    project
  });

  newRequest.save()
    .then(newRequest => res.json(newRequest))
    .catch(err => res.status(400).json('Error: ' + err));
});

//updates a request given an id
router.route('/update/:id').post((req, res) => {
  Request.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('Request updated.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//deletes a request given an id
router.route('/:id').delete((req, res) => {
  Request.findByIdAndDelete(req.params.id)
    .then(() => res.json('Request deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//deletes requests given a project id
router.route('/project/:id').delete((req, res) => {
  Request.deleteMany({ project: req.params.id })
    .then(() => res.json('Requests deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

//searches for all requests that have the given creator id
router.route('/search').post((req, res) => {
  var filter = {};

  if (req.body.creator)
    filter.creator = req.body.creator;

  Request.find(filter)
    .then(request => res.json(request))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;