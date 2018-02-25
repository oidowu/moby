'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var env = require('dotenv').config();
var request = require('request');
var FeedParser = require('feedparser');
//var datasources = require('../server/datasources.json');

//var datasource = require('loopback-datasource-juggler').DataSource;
var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
    fetch('http://feeds.washingtonpost.com/rss/politics');
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;
  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

function fetch(feed) {
  var req = request(feed, {timeout: 10000, pool: false});
  var feeds = require('../common/models/feed');
  var Article = app.models.Article;
  var newsFeed = app.models.Feed;
  req.setMaxListeners(50);
  var feedparser = new FeedParser();
  req.on('errloopor', done);
  req.on('response', function(res) {
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
    var encoding = res.headers['content-encoding'] || 'identity';
    var charset = getParams(res.headers['content-type'] || '').charset;
    res.pipe(feedparser);
  });
  var dest = Article.destroyAll(function(err, artic) {
    if (err) throw err;
  });
  feedparser.on('error', done);
  feedparser.on('end', done);
  feedparser.on('readable', function() {
    var parsedFeed = newsFeed.create({'title': 'test2'});
    //console.log(JSON.stringify(parsedFeed));
    // console.log(JSON.stringify({'title': 'test'}));
    var post;
    while (post = this.read()) {
      console.log(post.title, '|', post.author);
      var arti = Article.create({'author': post.author, 'title': post.title}, function(err, artic) {
        if (err) throw err;
        console.log('Created:', artic);
      });

      var arti2 = Article.find({'where': {'title': post.title}}, function(err, artic) {
        if (err) throw err;
        console.log('Found', artic);
      });
    }
  });
}

function getParams(str) {
  var params = str.split(';').reduce(function(params, param) {
    var parts = param.split('=').map(function(part) { return part.trim(); });
    if (parts.length === 2) {
      params[parts[0]] = parts[1];
    }
    return params;
  }, {});
  return params;
}

function done(err) {
  if (err) {
    console.log(err, err.stack);
    return process.exit(1);
  }
  //process.exit();
}
