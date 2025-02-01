const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    telegramId: {
      type: Number,
      require: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    userName: {
      type: String,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
