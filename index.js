'use strict';
var pjson = require('../../package.json');
var user = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

var url = 'https://damp-fjord-1779.herokuapp.com';
//url = 'http://localhost:3000';

var io = require('socket.io-client'),
    socket = null,
    isActive = false,
    isConnected = false;

module.exports = function (options, cb) { };

module.exports.changed = function (arg1) {
    if (isActive && isConnected) {
        socket.emit('message-event', arg1);
    }
};

module.exports.listen = function (active, opts) {
    isActive = active;
    if (isActive) {
        console.log('> Shovel');

        socket = io.connect(url);
        socket.on('connect', function () {
            isConnected = true;
            socket.emit('message-connect', {
                user: user,
                project: pjson.name
            });
        });
    }
};