var models = require('../models');
var TextPost = models.TextPost;

function index(req, res) {
  TextPost.find({}, function(err, textPosts) {
    if (err) res.send(err);
    else res.json(textPosts);
  }).sort({votes: -1});
}

function create(req, res) {
  TextPost.create(req.body, function(err, textPost) {
    if (err) res.send(err);
    else res.json(textPost);
  })
}

function show(req, res) {
  TextPost.findById(req.params.id, function(err, textPost) {
    if (err) res.send(err);
    else res.json(textPost);
  })
}

function update(req, res) {
  TextPost.findByIdAndUpdate(req.params.id,
    {$set: req.body}, {new: true}, function(err, textPost) {
    if (err) res.send(err);
    else res.json(textPost);
  })
}

function destroy(req, res) {
  TextPost.findByIdAndRemove(req.params.id, function(err) {
    if (err) res.send(err);
    else res.send("Post successfully deleted");
  })
}

module.exports.index    = index;
module.exports.create   = create;
module.exports.show     = show;
module.exports.update   = update;
module.exports.destroy  = destroy;
