// Create web server
// By: Ari Lerner
// Date: 5/20/2015
//***********************************************************

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment.js');
var Post = require('../models/post.js');

router.post('/', function(req, res) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    Post.findById(comment.post, function(err, post) {
      if (err) {
        return res.status(500).json({ err: err.message });
      }
      post.comments.push(comment);
      post.save(function(err, post) {
        if (err) {
          return res.status(500).json({ err: err.message });
        }
        res.json({ 'post': post, 'comment': comment });
      });
    });
  });
});

router.get('/', function(req, res) {
  Comment.find(function(err, comments) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json(comments);
  });
});

router.get('/:id', function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json(comment);
  });
});

router.put('/:id', function(req, res) {
  Comment.findByIdAndUpdate(req.params.id, req.body, function(err, comment) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json(comment);
  });
});

router.delete('/:id', function(req, res) {
  Comment.findByIdAndRemove(req.params.id, function(err, comment) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json(comment);
  });
});

module.exports = router;