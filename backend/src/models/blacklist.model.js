const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "token is required to be added in blacklist"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400, // Auto-expire blacklisted tokens after 24 hours
    },
  },
  { timestamps: true }
);

const tokenBlacklistModel = mongoose.model("blacklistModel", blacklistTokenSchema);

module.exports = tokenBlacklistModel;