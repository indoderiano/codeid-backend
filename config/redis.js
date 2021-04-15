var redis = require('redis');

var host = 'apn1-fun-dodo-30338.upstash.io';
var port = '30338';
var password = '257c3dda9f7445a4b2f13848cd989ea8';

var clientRedis = redis.createClient ({
    port : port,
    host : host,
    password: password
});


module.exports = {clientRedis}