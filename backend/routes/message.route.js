const router = require('express').Router();
let Message = require('../models/message.model');

//gets a message given an id
router.route('/:id').get((req, res) => {
  Message.findById(req.params.id)
    .then(message => res.json(message))
    .catch(err => res.status(400).json('Error: ' + err));
});

//gets all messages
router.route('/').get((req, res) => {
  Message.find()
    .then(message => res.json(message))
    .catch(err => res.status(400).json('Error: ' + err));
});

//adds a message
router.route('/add').post((req, res) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  const message = req.body.message;

  const newMessage = new Message({
    sender,
    receiver,
    message
  });

  newMessage.save()
    .then(newMessage => res.json(newMessage))
    .catch(err => res.status(400).json('Error: ' + err));
});

//updates a message given an id
router.route('/update/:id').post((req, res) => {
  Message.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('Message updated.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//deletes a message given an id
router.route('/:id').delete((req, res) => {
  Message.findByIdAndDelete(req.params.id)
    .then(() => res.json('Message deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;