var db = require('../models');

db.TextPost.remove({}, function(err, posts) {
  if (err) console.log(err);
  console.log('Deleted Posts');
  let postData = [
    {
      title: "Reddit Clone Post 1",
      content: "I have no imagination, this is the first post",
      thumbnail_image_url: "http://www.brooksforgings.co.uk/assets/js/tinymce/plugins/moxiemanager/data/files/images/artistic-catalogue/arw2-wooden-bollard.jpg",
      votes: 0
    },
    {
      title: "Second Post",
      content: "This is the second post",
      thumbnail_image_url: "http://savingatthelake.com/wp-content/uploads/2012/07/honey-bunches-of-oats.jpeg",
      votes: 3
    }
  ];
  db.TextPost.create(postData, function(err, posts) {
    if (err) console.log(err);
    console.log(`Created posts`);

    db.Comment.remove({}, function(err, comments) {
      if (err) console.log(err);
      console.log('Deleted Comments');
      let commentData = [
        {
          content: "Comment 1",
          post_id: posts[0]._id,
          votes: 0
        },
        {
          content: "Comment 4",
          post_id: posts[1]._id,
          votes: 0
        }
      ];
      db.Comment.create(commentData, function(err, comments) {
        if (err) console.log(err);
        console.log('Created comments', comments);
        process.exit();
      })
    })
  })
})
