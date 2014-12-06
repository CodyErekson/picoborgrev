var i2c = require('i2c');
var _ = require('underscore');
var constants = require('./lib/constants.js');
var command = constants.command;
var value = constants.value;
var limit = constants.limit;

var wire = new i2c(value.DEFAULT_I2C_ADDRESS, {device: value.I2C_BUS_ID});

//var out = _.range(0x03, 0x78, 1);
//console.log(out);

wire.readBytes(command.GET_ID, limit.I2C_MAX_LEN, function(err, res) {
    if ( err ){
        console.log("Error:\n");
        console.log(err);
    }
    var b = Buffer.isBuffer(res);
    if ( b ){
        console.log('true');
        console.log(res.length);
        var j = JSON.stringify(res);
        console.log(j);
        console.log(res[1]);
        if ( res[1] == value.I2C_ID_PICOBORG_REV ){
            console.log('Found PicoBorg Reverse!');
        }
    } else {
        console.log('false');
    }
});

wire.scan(function(err, data) {
    if ( err !== null ){
        console.log(err);
    } else {
        for( var d in data ){
            if ( data[d] !== 0 ){
                var hex = data[d];
                var dec = "0x" + hex.toString(16);
                console.log("hex: " + data[d] + ", dec: " + dec);
            }
        }
    }
});
