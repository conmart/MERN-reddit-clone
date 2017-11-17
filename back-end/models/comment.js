var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CommentSchema = new Schema({
  content: String,
  post_id: [{ type: Schema.Types.ObjectId, ref: 'TextPost' }],
  votes: Number,
  comment_id: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
