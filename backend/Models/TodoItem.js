let mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
  text: {
    type: String
  },
  done: {
    type: Boolean
  },
  date: {
    type: Date
  }
}, { collection: 'todoitems'});

module.exports = mongoose.model('TodoItem', todoItemSchema);

