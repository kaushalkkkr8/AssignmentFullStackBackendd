const mongo = require("mongoose");

const userModel = new mongo.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  skill: [
    {
      type: String,
    },
  ],
  interests: [
    {
      type: String,
    },
  ],
  bio: {
    type: String,
  },
  role: {
    type: String,
  },
  follower: [
    {
      user: { type: mongo.Schema.Types.ObjectId, ref: "Profile" },
    },
  ],
  following: [
    {
      user: { type: mongo.Schema.Types.ObjectId, ref: "Profile" },
    },
  ],
  notifications: [
    {
      user: { type: mongo.Schema.Types.ObjectId, ref: "Profile" },

      timestamp: { type: Date, default: Date.now },
    },
  ],
});
const UserModel = mongo.model("user", userModel);
module.exports = UserModel;
