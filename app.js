global.__config = require('./config');
var http = require('http');
var app = require('koa')();
var router = require('koa-router');
var jade = require('koa-jade');
var twStream = require('node-tweet-stream');

app.use(jade.middleware({
    viewPath: __dirname + '/views',
    debug: false,
    pretty: false,
    compileDebug: false
}));

app.use(router(app));

var server = http.createServer(app.callback());
var io = require('socket.io')(server);

//tw = new twStream(__config.oauth);
//tw.track('#prisedotage');
//tw.on('tweet', function(tweet) {
    //console.log(tweet.text);
//});




/* ROUTES */
app.get('/', function *(next) {
    yield this.render('home');
});

/* SOCKET.IO */
var usersStream = {};


io.on('connection', function(socket) {
    socket.on('track', function( data ) {
        if (!usersStream[this.client.id]) {
            tw = new twStream(__config.oauth);
            tw.track(data);
            tw.on('tweet', function(tweet) {
                console.log(tweet.text);
                socket.emit('tweet',tweet);
            });
        } else {
            usersStream[this.client.id].track(data);
        }
    });
});

server.listen(process.env.PORT || 3000 );
