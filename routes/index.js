
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
var TITLE = 'はてなまとめ';

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


exports.index = function(req, res, next){
    var start = currentStartDay();
    var end = currentEndDay();
    var count = 0;

    db.collection(COLL_NAME, function (err, collection) {
        collection.find({date:{"$gt":start, "$lt":end}}).toArray(function (err, items) {
            if (!err) {
                var articles = {
                    social: [],
                    economics: [],
                    life: [],
                    knowledge: [],
                    entertainment: [],
                    it: [],
                    game: [],
                    fun: [],
                };

                items.forEach(function(item) {
                    if (item.subject === '世の中') {
                        articles.social.push(item);
                    } 
                    if (item.subject === '政治と経済') {
                        articles.economics.push(item);
                    }

                    if (item.subject === '暮らし') {
                        articles.life.push(item);
                    }
                    if (item.subject === '学び') {
                        articles.knowledge.push(item);
                    }
                    if (item.subject === 'テクノロジー') {
                        articles.it.push(item);
                    }
                    if (item.subject === 'エンタメ') {
                        articles.entertainment.push(item);
                    }
                    if (item.subject === 'アニメとゲーム') {
                        articles.game.push(item);
                    }
                    if (item.subject === 'おもしろ') {
                        articles.fun.push(item);
                    }
                });

                res.render('index', { 
                    title: TITLE,
                    articles: articles
                });
            } else {
                res.render('index', { title: TITLE,
                           articles: null
                });
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

