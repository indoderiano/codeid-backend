var redis = require('redis');

var host = 'apn1-fun-dodo-30338.upstash.io';
var port = '30338';
var password = process.env.REDIS_HOST_PASSWORD;

var clientRedis = redis.createClient ({
    port : port,
    host : host,
    password: password
});


module.exports = {clientRedis}