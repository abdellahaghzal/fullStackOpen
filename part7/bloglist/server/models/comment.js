const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  blogId: {
    type: String,
    required: [true, "blogId is required!"],
  },
  content: {
    type: String,
    required: [true, "content is required!"],
  },
});

commentSchema.set("toJSON", {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString();
    delete retObj._id;
    delete retObj.__v;
  },
});

module.exports = mongoose.model("Comment", commentSchema);
