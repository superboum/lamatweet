var koa = require( 'koa' );
var router = require('koa-router');
var jade = jade = require('koa-jade');
var socket = require( 'koa-socket' );

global.__config = require('./config');
twitter = require('./lib/twitter');

twitter.init()

/* INIT */
var app = koa();

app.use(jade.middleware({
    viewPath: __dirname + '/views',
    debug: false,
    pretty: false,
    compileDebug: false
}));

app.use(router(app));

/* ROUTES */
app.get('/', function *(next) {
    yield this.render('home');
});

/* SOCKET.IO */
socket.start( app );

socket.on( 'join', function( data ) {
    console.log( 'join event fired', data );
});

app.server.listen( process.env.PORT || 3000 );
