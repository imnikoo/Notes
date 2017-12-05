const Note = require('../model/note.js');
const forIn = require('lodash/forIn');
const hasIn = require('lodash/hasIn');

const getAll = (req, res) => {
   Note.find({})
      .then(notes => res.send(notes))
      .catch(err => res.send(notes));
};

const get = (req, res) => {
   let noteId = req.params.id;
   Note.findById(noteId)
      .then(note => {
         if (note) {
            res.status(200).send(note)
         }
         res.status(404).send();
      })
      .catch(err =>
         res.send(err)
      )
};

const getByUserId = (req, res) => {
   let userId = req.params.id;
   
   Note.find({userId: userId})
      .then(notes => {
         if(notes && notes.length) {
            res.status(200).send(notes);
         }
         res.status(404).send();
      }).catch(err => res.send(err));
   
};

const post = (req, res) => {
   let newNote = new Note();
   newNote.title = req.body.title;
   newNote.content = req.body.content;
   newNote.userId = req.body.userId;
   
   newNote.save()
      .then(note => res.status(200).send(note))
      .catch(err => res.send(err));
};

const put = (req, res) => {
   let noteId = req.params.id;
   Note.findById(noteId)
      .then(note => {
         if (!note) {
            res.status(404).send();
         }
         forIn(req.body, (value, key) => {
            if (hasIn(note, key) && hasIn(req.body, key)) {
               note[key] = value;
            }
         });
         return note.save();
      })
      .then(updatedNote => res.status(200).send(updatedNote))
      .catch(err => res.status(500).send(err));
};

const remove = (req, res) => {
   let noteId = req.params.id;
   
   Note.remove({_id: noteId})
      .then((result) => res.status(200).send(result))
      .catch(err => res.status(404).send(err))
};

module.exports = {
   getAll,
   get,
   getByUserId,
   post,
   put,
   remove
};