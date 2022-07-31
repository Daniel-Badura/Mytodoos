const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  duedate: {
    type: Date,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  severity: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
