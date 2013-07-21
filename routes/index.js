
/*
 * GET home page.
 */

/*
 * Setting DB
 */
var mongo = require('mongodb');

var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var DB_NAME = 'hatenadb';
var COLL_NAME = 'article';

// Server
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db(DB_NAME, server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'entries' database");
        db.collection(COLL_NAME, {strict:true}, function(err, collection) {
            if(err) {
                // サンプルデータでコレクションを作成する
                console.log("The 'entries' collection doesn't exist. Creating it with sample data...");
                //sampleDB();
            }
        });
    }
});


exports.index = function(req, res){
    var start = currentStartDay();
    var end = currentEndDay();

    db.collection(COLL_NAME, function (err, collection) {
        collection.find({date:{"$gt":start, "$lt":end}}).toArray(function (err, items) {
            if (!err) {
                res.render('index', { title: 'Express',
                           articles: items});
            } else {
                res.render('index', { title: 'Express',
                           articles: null});
            }
        });
    });
};

var ONE_DAY = 24 * 60 * 60 * 1000;

var currentStartDay = function() {
    var date = new Date();

    console.log(ONE_DAY);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    date = date - ONE_DAY;

    return parseInt(date/1000);
};

var currentEndDay = function() {
    var date = new Date();

    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);

    date = date - ONE_DAY;
    return parseInt(date/1000);
};

