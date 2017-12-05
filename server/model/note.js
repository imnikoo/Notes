let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let NoteScheme = new Schema (
   {
      title: { type: String, required: true },
      content: { type: String, required: true },
      userId: { type: String, required: true },
      createdAt: {type: Date, default: Date.now }
   }
);

module.exports = mongoose.model('Note', NoteScheme);