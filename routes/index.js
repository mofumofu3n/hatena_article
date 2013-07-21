
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
    db.collection(COLL_NAME, function (err, collection) {
        collection.find().toArray(functino (err, items) {
            console.log("findAll");
        });
    });
    res.render('index', { title: 'Express' });
};
