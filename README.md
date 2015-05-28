picoborgrev
=================

A controller library for PiBorg's PicoBorg Reverse motor driver board designed for use with the Raspberry Pi.

I highly recommend that you first read through the "Getting Started" page on PiBorg's site. You may also find it worthwhile to run their setup and installation script. That will enable the I2C bus on your Raspberry Pi, install i2c-tools and other needed utilities, as well as their Python version of the PicoBorg Reverse controller.

https://www.piborg.org/picoborgrev/install


##Installation

```
https://github.com/cerekson/picoborgrev/tarball/master
```

Unless you either ran PiBorg's installation script, or have previously enabled the I2C bus on your Raspberry Pi, you will need to enable it.  Follow this wonderful AdaFruit tutorial to do so: https://learn.adafruit.com/adafruits-raspberry-pi-lesson-4-gpio-setup/configuring-i2c


##Usage

######Examples

```node
var prb = require('picoborgrev').picoborgrev();

/* Unlike the Python and Arduino variants which accept a float input ranged from -1 to +1,
* I opted to simplify this for the end-user and require a percentage of the maximum speed
* which is ranged from -255 - +255. Therefore these functions accept anything from -100 to -1
* for reverse, 0 to stop, and 1 to 100 for forward.
*/
/* Start motor 2 moving forward at 100% maximum speed */
pbr.SetMotor2(100, function(err){
    if ( err ){
        console.log("Error: " + err);
    }
});

/* Stop motor 2 */
pbr.SetMotor2(0, function(err){
    if ( err ){
        console.log("Error: " + err);
    }
});

/* Start motor 1 moving in reverse at 50% maximum speed */
pbr.SetMotor1(-50, function(err){
    if ( err ){
        console.log("Error: " + err);
    }
});

/* Start both motors moving forward at 30% maximum speed */
pbr.SetMotors(30, function(err){
    if ( err ){
        console.log("Error: " + err);
    }
});

/* Stop both motors */
pbr.MotorsOff(function(err){
    if ( err ){
        console.log("Error: " + err);
    }
});

/* Another way to stop both motors */
pbr.SetMotors(0, function(err){
    if ( err ){
        console.log("Error: " + err);
    }
});

/* Get the current speed (% of max speed) of motor 2 */
pbr.GetMotor2(function(err, ret){
    if ( err ){
        console.log("Error: " + err);
    }
    if (ret){
        console.log("Motor 2 is at " + ret + "% power.");
    }
});

/* Turn the on-board LED on and off */
pbr.SetLed(true, function(err){
    if ( err ){
        console.log("Error: " + err);
    }
});

pbr.SetLed(false, function(err){
    if ( err ){
        console.log("Error: " + err);
    }
});

/* Get the status of the on-board LED */
pbr.GetLed(function(err, ret){
    if ( err ){
        console.log("Error: " + err);
    }
    if (ret){
        console.log("The LED is on.");
    }
});

/* A good way to force the motors to stop if the node.js process stops running (ie, if you press CTRL+C.)*/
process.on('SIGINT', function() {
    pbr.MotorsOff(function(err){
        if ( err ){
            console.log("Error: " + err);
        }
    });
});
```

######Available Methods

```node

SetMotor2(int power, callback);

GetMotor2(callback);

SetMotor1(int power, callback);

GetMotor1(callback);

SetMotors(int power, callback);

MotorsOff(callback);

CheckId(callback);

SetLed(bool state, callback);

GetLed(callback);

ResetEpo(callback);

GetEpo(callback);

SetEpoIgnore(bool state, callback);

GetEpoIgnore(callback);

SetCommsFailsafe(bool state, callback);

GetCommsFailsafe(callback);

GetDriveFault(callback);

*SetEncoderMoveMode(bool state, callback);

*GetEncoderMoveMode(callback);

*EncoderMoveMotor2(int counts, callback);

*EncoderMoveMotor1(int counts, callback);

*EncoderMoveMotors(int counts, callback);

*IsEncoderMoving(callback);

*SetEncoderSpeed(int power, callback);

*GetEncoderSpeed(callback);

ScanForCount(int bus, callback);

*ScanForAddress(byte index, callback);

SetNewAddress(byte newAddress, callback);
```

_* This method has not yet been implemented._


##Contact

The author, Cody Erekson, can be contacted in one of the following ways/places:

* @CodyErekson
* https://github.com/cerekson
* www.linkedin.com/in/codyerekson/
* cody@erekson.org
* http://blog.codyerekson.me


##License

The MIT License (MIT)

Copyright (c) 2014 Cody Erekson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
