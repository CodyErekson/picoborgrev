var pbr = require('./lib/picoborgrev.js').picoborgrev();

process.on('SIGINT', function() {
    pbr.MotorsOff(function(err){
        if ( err ){
            console.log("Error: " + err);
        }
    });    
});

/*
pbr.GetMotor2(function(err,res){
    if ( err ){
        console.log("Error: " + err);
    }
    if ( res ){
        console.log(res);
    }
});
*/

/*
pbr.SetMotors(100, function(err){
    if ( err ){
        console.log("Error: " + err);
    console.log("SetMotors");
    }
});
*/

pbr.SetLed(false, function(err){
    if ( err ){
        console.log("Error: " + err);
    }
});
