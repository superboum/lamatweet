var Twitter = require('twitter');
var OAuth = require('oauth').OAuth;

var client;

var OAUTH_REQUEST_TOKEN_URL = "https://api.twitter.com/oauth/request_token";
var OAUTH_ACCESS_TOKEN_URL = "https://api.twitter.com/oauth/access_token";
var OAUTH_VERSION = "1.0";
var OAUTH_SIGNATURE_METHOD = "HMAC-SHA1";

module.exports = {

    init: function() {
        var oa = new OAuth(
                OAUTH_REQUEST_TOKEN_URL,
                OAUTH_ACCESS_TOKEN_URL,
                __config.consumerKey,
                __config.consummerPrivate,
                OAUTH_VERSION,
                null,
                OAUTH_SIGNATURE_METHOD);

        console.log(__config.consumerKey);
        console.log(__config.consumerPrivate);
        oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
            console.log(error, oauth_token, oauth_token_secret, results);
        });
        
        client = new Twitter({
            consumer_key: __config.consumerKey,
            consumer_secret: __config.consumerPrivate,
            access_token_key: '',
            access_token_secret: ''
        });

    }
}
