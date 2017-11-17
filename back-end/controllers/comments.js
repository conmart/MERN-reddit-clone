var models = require('../models');
var Comment = models.Comment;

function index(req, res) {
  Comment.find({ post_id: req.params.post_id, comment_id: [] }, function(err, comments) {
    if (err) res.send(err);
    else res.json(comments);
  }).sort({votes: -1});
}

function create(req, res) {
  Comment.create(req.body, function(err, comment) {
    if (err) res.send(err);
    else res.json(comment);
  })
}

function commentsIndex(req, res) {
  Comment.find({ comment_id: req.params.id}, function(err, comments) {
    if (err) res.send(err);
    else res.json(comments);
  })
}

function update(req, res) {
  Comment.findByIdAndUpdate(req.params.id,
    {$set: req.body}, {new: true}, function(err, comment) {
      if (err) res.send(err);
      else res.json(comment);
    })
}

function destroy(req, res) {
  Comment.findByIdAndRemove(req.params.id, function(err, comment) {
    if (err) res.send(err);
    else res.send("Comment successfully deleted")
  })
}

function allComments(req, res) {
  Comment.find({}, function(err, comments) {
    if (err) res.send(err);
    else res.json(comments)
  })
}

module.exports.index = index;
module.exports.create = create;
module.exports.commentsIndex = commentsIndex;
module.exports.update = update;
module.exports.destroy = destroy;
module.exports.allComments = allComments;
